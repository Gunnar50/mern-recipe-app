import { useContext, useEffect, useState } from "react";
import API from "../api";
import { UserContext } from '../contexts/Context';

export const Saved = () => {
    const [votedRecipes, setVotedRecipes] = useState([]);
    const {userID, currentUsername} = useContext(UserContext);

    async function fetchVotedRecipes () {
        try {
            const response = await API.get(`/recipes/get-voted-recipes/${userID}`);
            setVotedRecipes(response.data.votedRecipes);
            
        } catch (err) {console.error(err);}
    }

    useEffect(() => {
        fetchVotedRecipes();
    });


    return (
        <div className="row justify-content-center mt-4">
            {votedRecipes.map((item, idx) => (
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
                            <a href={`/recipe/${item._id}`}>View Recipe</a>
                        </div>

                        
                    </div>
                </div>
            ))}
        </div>
    )
}