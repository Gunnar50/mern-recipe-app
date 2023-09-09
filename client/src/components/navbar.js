import { useContext, useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { UserContext } from '../contexts/Context';
import './navbar.css';


export const NavBar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(UserContext);

    useEffect(() => {
        const verifyAccess = async () => {
            try {
                const response = await API.get('/auth/verify-token');
                if(response.data.valid) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch(error) {
                console.log(error);
                setIsAuthenticated(false);
            }
        }
        if(cookies.access_token) {
            verifyAccess();
        }
    }, [cookies.access_token]);

    const Logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        setIsAuthenticated(false);
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "70px"}}>
            <Link className="navbar-brand home-link" to="/">Home</Link>

            <div className="collapse navbar-collapse justify-content-end">
                <div className="navbar-nav">
                    {!isAuthenticated ? 
                        (<Link className="nav-item nav-link btn btn-outline-secondary" to="/auth">Login/Register</Link>)
                     : 
                        <>
                        <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/create">Create Recipe</Link>
                        <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/saved">Favourite Recipes</Link>
                        <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/my-recipes">My Recipes</Link>
                        <button className="nav-item nav-link btn btn-outline-secondary" onClick={Logout}>Logout</button>
                        </>}
                </div>
            </div>
        </nav>
    );
}
