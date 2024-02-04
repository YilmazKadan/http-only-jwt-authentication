import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    let [authenticated, setAuthenticated] = useState("loading");
 

    useEffect(() => {
      async function getAuthStatus() {
        try {
         
          const response = await axios.get('http://localhost:3001/check-auth', {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          setAuthenticated(response.data.isAuthenticated)
  
        } catch (error) {
          setAuthenticated(false)
        }
      }

      getAuthStatus()
    }, [setAuthenticated, authenticated]);
    
  
    async function login (values){
     
      try {   
        const response = await axios.post('http://localhost:3001/login', {
          username: values.username,
          password: values.password,
        },{
          withCredentials:true
        });
       setAuthenticated(true)
       document.cookie = "NotSafedTokenInCookie"
       localStorage.setItem("token","NotSafedTokenInLocalStorage")
      } catch (error) {
        setAuthenticated(false)
      }
    };


    async function logout() {
      try {
        // Sunucuya logout isteği gönder
        await axios.post('http://localhost:3001/logout',[],{
          withCredentials:true,
        });
    
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }

    if(authenticated=="loading")
      return null;

    const contextValue = {authenticated,login,logout}

   

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;