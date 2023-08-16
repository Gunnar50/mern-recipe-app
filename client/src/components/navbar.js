import { Link } from 'react-router-dom';
import './navbar.css';

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height: "70px"}}>
            <Link className="navbar-brand home-link" to="/">Home</Link>

            <div className="collapse navbar-collapse justify-content-end">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/create">Create Recipe</Link>
                    <Link className="nav-item nav-link btn btn-outline-secondary mr-2" to="/saved">Saved Recipes</Link>
                    <Link className="nav-item nav-link btn btn-outline-secondary" to="/auth">Login/Register</Link>
                </div>
            </div>
        </nav>
    );
}
