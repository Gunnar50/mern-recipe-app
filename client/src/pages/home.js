import { useContext, useEffect, useState } from "react";
import API from "../api";
import { UserContext } from '../contexts/Context';

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [votedRecipes, setVotedRecipes] = useState([]);
    const {user} = useContext(UserContext);

    const fetchRecipes = async () => {
        try {
            const response = await API.get("/recipes");
            setRecipes(response.data);
            
        } catch (err) {console.error(err);}
    }

    useEffect(() => {
        const fetchVotedRecipes = async () => {
            try {
                const response = await API.get(`/recipes/get-recipes/${user.id}`);
                setVotedRecipes(response.data.votedRecipes);
                
            } catch (err) {console.error(err);}
        }

        fetchRecipes();
        fetchVotedRecipes();
    }, [user.id])

    const voteUp = async (e, recipeID) => {
        e.preventDefault();
        try {
            const response = await API.put("/recipes", {recipeID, userID: user.id});
            setVotedRecipes(response.data.votedRecipes);
            fetchRecipes();
          
        } catch(err) {console.log(err);}

    }

    const isRecipeVoted = (recipeID) => Array.isArray(votedRecipes) && votedRecipes.includes(recipeID);

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
                            <h6>Author: {item.creator.username ? item.creator.username === user.currentUsername ? `${item.creator.username} (Me)` : item.creator.username : 'Unknown'}</h6>
                            <a href={`/recipe/${item._id}`}>View Recipe</a>
                        </div>

                        {/* Right side content with thumbs up icon and vote count */}
                        <div className="d-flex flex-column align-items-center mr-5">
                            
                                <i 
                                    onClick={(e) => {if(!isRecipeVoted(item._id)) voteUp(e, item._id)}} style={{color: isRecipeVoted(item._id) ? "blue" : "grey" }}
                                    className={`fas fa-thumbs-up fa-2x mb-2 link-like ${(isRecipeVoted(item._id) || !user.id) && "disabled"}`}></i>
                       
                            <span>{item.votes} votes</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}