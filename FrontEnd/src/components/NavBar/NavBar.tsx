import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../../services/Cookies/Cookies";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
type User = {
  picture: string;
};

function NavBar() {
  const [userImage, setUserImage] = useState<string | null >(null);
  const navigate = useNavigate();

  useEffect(() => {
    let Token = getCookie("saltnote_key");
    if (Token != undefined) {
      setUserImage((jwtDecode(Token) as User).picture);
    }  
  }, []);

  const logOut = () => {
    googleLogout();
    deleteCookie("saltnote_key")
    setUserImage(null);
    navigate("/login")
  };

  return (
    <nav className="flex h-14 z-40 w-full items-center fixed justify-between top-0 inset-x-0 bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] py-1">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-xl cursor-pointer" onClick={()=> navigate("/about") }>&lt; Salt / &gt;</p>
    
         {userImage && <img src={userImage} onClick={()=> logOut()} alt="User profile picture" className="h-10 w-10 rounded-full overflow-hidden cursor-pointer" />} 

      </div>
    </nav>
  );
};

export default NavBar;
