import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/Context';
import './navbar.css';


export const NavBar = () => {
    const navigate = useNavigate();
    const {user, logout} = useContext(UserContext);

    const Logout = () => {
        logout();
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "70px"}}>
            <Link className="navbar-brand home-link" to="/">Home</Link>

            <div className="collapse navbar-collapse justify-content-end">
                <div className="navbar-nav">
                    {!user.id ? 
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
