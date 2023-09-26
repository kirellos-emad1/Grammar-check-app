import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useState, useEffect } from "react";

export default function Navbar (props) {
const [deviceSize, changeDeviceSize] = useState(window.innerWidth)
const breakpoint = 768;
useEffect (()=>{
  const resizeW = ()=> changeDeviceSize(window.innerWidth)
  window.addEventListener('resize', resizeW)
  return ()=> window.removeEventListener('resize', resizeW)
})


    return deviceSize < breakpoint ? <MobileNavbar isLoggedIn={props.isLoggedIn} username={props.username}/> : <DesktopNavbar  isLoggedIn={props.isLoggedIn} username={props.username}/>;
}