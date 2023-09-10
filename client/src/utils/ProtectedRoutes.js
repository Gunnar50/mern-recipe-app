import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from '../contexts/Context';


export const ProtectedRoutes = () => {
	const {user} = useContext(UserContext);

	return (
		<>
			{user.isAuth ? <Outlet/> : <Navigate to="/auth"/>}
		</>
	)
}

