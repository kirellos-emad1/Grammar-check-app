from package import app
from flask import get_flashed_messages, redirect, url_for, flash, request, render_template
from package.models import User
from package import db
from flask_login import current_user, login_user, logout_user, login_required
import json
import os
from oauthlib.oauth2 import WebApplicationClient
import requests


os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')

GOOGLE_DISCOVERY_URL = (
    'https://accounts.google.com/.well-known/openid-configuration'
)

client = WebApplicationClient(GOOGLE_CLIENT_ID)



@app.route('/')
def home_page():
    pass



@app.route('/login-google', methods=['GET','POST'])
def google_login():
    if request.method == 'POST':
        google_provider_cfg = get_google_provider_cfg()
        authorization_endpoint = google_provider_cfg["authorization_endpoint"]
        
        request_uri = client.prepare_request_uri(
            authorization_endpoint,
            redirect_uri= 'http://localhost:5000/callback',
            scope=["openid","email","profile"]
        )
        return redirect(request_uri)
    
    
@app.route('/callback')
def callback():
    code = request.args.get('code')
    google_provider_cfg = get_google_provider_cfg()
    
    token_endpoint = google_provider_cfg['token_endpoint']
    
    token_url,headers,body = client.prepare_token_request(
        token_endpoint,
        authorization_response= request.url,
        redirect_url=request.base_url,
        code=code
    )
    
    token_response=requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
    )
    
    client.parse_request_body_response(json.dumps(token_response.json()))
    userinfo_endpoint = google_provider_cfg['userinfo_endpoint']
    
    uri,headers,body = client.add_token(userinfo_endpoint)
    
    userinfo_response =  requests.get(uri,headers=headers,)
        
    if userinfo_response.json().get('email_verified'):
        unique_id = userinfo_response.json()['sub']
        user_email = userinfo_response.json()['email']
        name = userinfo_response.json()['given_name']
    else:
        flash('User Email not available or not verified by Google')
        return redirect(url_for('register_page'))

    is_gmail = True
    user = User(username=name,
                email_address=user_email,
                password=unique_id,
                is_gmail = is_gmail)
    email_exist = User.query.filter_by(email_address = user_email).first()
    
    if not email_exist:
        db.session.add(user)
        db.session.commit()
    attempted_user = User.query.filter_by(email_address = user_email).first()
    if attempted_user.is_gmail == True:
        login_user(attempted_user)
    else:
        flash('this account is already registered plz sign in with your account and password')
        return redirect('http://localhost:3000/login')
    
    return redirect('http://localhost:3000')
        
    
    
def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


@app.route('/register', methods=['GET','POST'])
def register_page():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        
        if request.method == 'POST':
        
            data = request.get_json()
        
            name = data['username']
            email = data['email_address']
            email =  email.lower()
            password = data['password']
            
            
            if not name:
                flash('Must provide a Username')
                return redirect(url_for('register_page'))
            elif not email:
                flash('Must provide a Email Address')
                return redirect(url_for('register_page'))
            elif not password:
                flash('Must Provide a Password')
                return redirect(url_for('register_page'))
            elif data['password'] != data['confirm_password']:
                flash("passwords do not match")
                return redirect(url_for('register_page'))
            email_exist = User.query.filter_by(email_address = email).first()
            if email_exist:
                flash('Email Address is already exists Please try to login or Register with different Email')
                return redirect(url_for('register_page'))

            user_to_create = User(username=name,
                                email_address=email,
                                password=password,
                                is_gmail = False)
            db.session.add(user_to_create)
            db.session.commit()
            attempted_user = User.query.filter_by(email_address=email).first()
            if attempted_user:
                login_user(attempted_user)
                return redirect(url_for('home_page'))
    return redirect(url_for('register_page'))


@app.route('/login',methods=['GET','POST'])
def login_page():
    if request.method == 'POST':
        email_address = request.form.get('email_address').lower()
        password = request.form.get('password')
        attempted_user = User.query.filter_by(email_address=email_address).first()
        if attempted_user and attempted_user.check_password_correction(
            attempted_password = password) and attempted_user.is_gmail == False: 
                login_user(attempted_user)
                return redirect(url_for('home_page'))
        else:
            flash('User Name and Password are not match! Please try again')
        return redirect(url_for('login_page'))
        
        

@app.route('/logout', methods=['GET','POST'])
def logout_page():
    if request.method == 'POST':
        logout_user()
        return redirect(url_for('home_page'))
    
    

@app.route('/data')
def data_route():
    if current_user.is_authenticated:
        return {"isLoggedIn":current_user.is_authenticated, "name": current_user.username, "email": current_user.email_address}
    else:
        return {"isLoggedIn": current_user.is_authenticated}
    
    
    
@app.route('/error')
def error_message():
    return {'error':get_flashed_messages()}