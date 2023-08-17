import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import {useCookies} from "react-cookie";

export const NavBar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const Logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "70px"}}>
            <Link className="navbar-brand home-link" to="/">Home</Link>

            <div className="collapse navbar-collapse justify-content-end">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/create">Create Recipe</Link>
                    <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/saved">Saved Recipes</Link>
                    {!cookies.access_token ? (<Link className="nav-item nav-link btn btn-outline-secondary" to="/auth">Login/Register</Link>)
                     : 
                     <button className="nav-item nav-link btn btn-outline-secondary" onClick={Logout}>Logout</button>}
                    
                </div>
            </div>
        </nav>
    );
}
