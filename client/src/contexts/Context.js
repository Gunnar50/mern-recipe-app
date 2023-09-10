import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
	const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
	
	const initialUser = JSON.parse(window.localStorage.getItem("user")) || null;
  	const initialToken = cookies.access_token || null;

	
	const [userID, setUserID] = useState(initialUser.userID);
	const [currentUsername, setCurrentUsername] = useState(initialUser.currentUsername);
	const [token, setToken] = useState(initialToken);

	const login = (userID, currentUsername, token) => {
		setUserID(userID);
		setCurrentUsername(currentUsername);
		setToken(token);
		setCookies("access_token", token);
		window.localStorage.setItem("user", JSON.stringify({userID, currentUsername}));
	}

	const logout = () => {
		setUserID(null);
		setToken(null);
		removeCookies("access_token");
		window.localStorage.removeItem("user");
	}

	return (
		<UserContext.Provider value={{
			userID, login, logout, token, currentUsername
		}}> 
		{children}
		</UserContext.Provider>
	)
}