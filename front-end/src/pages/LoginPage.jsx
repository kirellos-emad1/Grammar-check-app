import LoginForm from "../components/LoginForm";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function LoginPage(props) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sing in to your account</title>
      </Helmet>
      <LoginForm errMsg={props.errMsg} />
    </HelmetProvider>
  );
}
