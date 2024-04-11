import { GoogleLogin } from "@react-oauth/google";




const GoogleLogIn = () => {


  return (
    <GoogleLogin
    onSuccess={credentialResponse => {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 3600000);
        document.cookie = `google_login_key=${credentialResponse.credential};expires=${expirationDate.toUTCString()};`
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  )
}

export default GoogleLogIn