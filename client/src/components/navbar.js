import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import {useCookies} from "react-cookie";
import { useState, useEffect } from 'react';
import axios from 'axios';

export const NavBar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAccess = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth/verify-token', {
                    headers: {
                        'Authorization': cookies.access_token
                    }
                });
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
                    <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/create">Create Recipe</Link>
                    <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/saved">Saved Recipes</Link>
                    {!isAuthenticated ? 
                        (<Link className="nav-item nav-link btn btn-outline-secondary" to="/auth">Login/Register</Link>)
                     : 
                        <button className="nav-item nav-link btn btn-outline-secondary" onClick={Logout}>Logout</button>}
                </div>
            </div>
        </nav>
    );
}
