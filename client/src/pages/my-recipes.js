import { useEffect, useState } from "react"
import axios from "axios";
import {useCookies} from "react-cookie"

export const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentUsername, setCurrentUsername] = useState("");
    const [cookies, ] = useCookies(["access_token"])
    const userID = window.localStorage.getItem("userID");


    useEffect(() => {
        const getOwnRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/${userID}`);
                setRecipes(response.data.recipes);
                
            } catch (err) {console.error(err);}
        }
        
        const getCurrentUser = async () => {
            try {
                if(userID){
                    const response = await axios.get(`http://localhost:3001/auth/user/${userID}`);
                    setCurrentUsername(response.data.username);
                }
                
            } catch (err) {console.error(err);}
        }

        getCurrentUser();
        if(cookies.access_token) getOwnRecipes();
    }, [cookies.access_token, userID])

    if(!recipes) return null;

    return (
        <div className="row justify-content-center mt-4">
            {recipes.map((item) => (
                <div key={item._id} className="col-md-10 card card-body p-2 mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Image on the left side */}
                        <div>
                            <img src={item.image} alt="Recipe" className="img-fluid" style={{ maxWidth: '150px' }} />
                        </div>

                        {/* Middle content with title, description, and view link */}
                        <div style={{ flex: 2, margin: '0 20px' }}>
                            <h2 className="card-title">{item.name}</h2>
                            <p>Cooking Time: {item.cookingTime} minutes</p>
                            <h6>Author: {item.creator.username ? item.creator.username === currentUsername ? `${item.creator.username} (Me)` : item.creator.username : 'Unknown'}</h6>
                            <a href="/your-recipe-link">View Recipe</a>
                        </div>

                        {/* Right side content with thumbs up icon and vote count */}
                        <div className="d-flex flex-column align-items-center mr-5">
                                <button className="btn btn-primary mb-2" style={{width:"80px"}}>Edit</button>
                                <button className="btn btn-danger" style={{width:"80px"}}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}