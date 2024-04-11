import { GoogleLogin } from "@react-oauth/google";




const GoogleLogIn = () => {
  return (
    <GoogleLogin
    onSuccess={credentialResponse => {
      document.cookie = `google_login_key = ${credentialResponse.credential}`
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  )
}

export default GoogleLogIn