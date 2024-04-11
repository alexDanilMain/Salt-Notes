type Props = {
  profilePicture?: string;
};
const NavBar = ({ profilePicture }: Props) => {
  return (
    <nav className="flex h-14 z-40 w-full items-center fixed justify-between top-0 inset-x-0 bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] py-1">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-xl">&lt; Salt / &gt;</p>
    
         {profilePicture && <img src={profilePicture} alt="User profile picture" className="h-10 w-10 rounded-full overflow-hidden" />} 

      </div>
    </nav>
  );
};

export default NavBar;