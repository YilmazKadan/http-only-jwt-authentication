import { AuthContext } from "../provider/authProvider"
import React, { useContext } from "react";

const Logout= () => {
  const authContext = useContext(AuthContext);

  return (
    <button
      onClick={async () => {
        authContext.logout().then(()=>{
          window.location.href = "/";
        });
        
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
