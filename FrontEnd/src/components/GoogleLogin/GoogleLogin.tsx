import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../services/Cookies/Cookies";

const GoogleLogIn = () => {

const navigate = useNavigate();

  return (
    <GoogleLogin
    onSuccess={credentialResponse => {
        const expirationDate = new Date();
        if(getCookie("saltnote_key") == undefined){
          expirationDate.setTime(expirationDate.getTime() + 3600000);
          document.cookie = `saltnote_key=${credentialResponse.credential};expires=${expirationDate.toUTCString()};`
        }
        navigate("/about");
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  )
}

export default GoogleLogIn