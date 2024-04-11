import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleLogIn = () => {

const navigate = useNavigate();

  return (
    <GoogleLogin
    onSuccess={credentialResponse => {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 3600000);
        document.cookie = `saltnote_key=${credentialResponse.credential};expires=${expirationDate.toUTCString()};`
        navigate("/home");
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  )
}

export default GoogleLogIn