import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
	const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
	
	const initialUser = JSON.parse(window.localStorage.getItem("user")) || null;
  	const initialToken = cookies.access_token || null;

	const [user, setUser] = useState({
		id: initialUser?.userID,
		currentUsername: initialUser?.currentUsername,
		token: initialToken,
		isAuth: false
	})
	// const [userID, setUserID] = useState(initialUser?.userID);
	// const [currentUsername, setCurrentUsername] = useState(initialUser?.currentUsername);
	// const [token, setToken] = useState(initialToken);
	// const [isAuth, setIsAuth] = useState(false);

	const login = (userID, currentUsername, token) => {
		setUser({
			id: userID, currentUsername, token, isAuth: true
		})
		// setUserID(userID);
		// setCurrentUsername(currentUsername);
		// setToken(token);
		// setCookies("access_token", token);
		// setIsAuth(true);
		window.localStorage.setItem("user", JSON.stringify({userID, currentUsername}));
	}

	const logout = () => {
		setUser({
			id: null, currentUsername: null, token: null, isAuth: false
		})
		// setUserID(null);
		// setToken(null);
		// setCurrentUsername(null)
		// removeCookies("access_token");
		// setIsAuth(false);
		window.localStorage.removeItem("user");
	}

	return (
		<UserContext.Provider value={{
			user, login, logout,
		}}> 
		{children}
		</UserContext.Provider>
	)
}