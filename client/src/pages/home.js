import { useEffect, useState } from "react"
import axios from "axios";
import {useCookies} from "react-cookie"

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [votedRecipes, setVotedRecipes] = useState([]);
    const [currentUsername, setCurrentUsername] = useState("");
    const [cookies, ] = useCookies(["access_token"])
    const userID = window.localStorage.getItem("userID");

    const fetchRecipes = async () => {
        try {
            const response = await axios.get("http://localhost:3001/recipes");
            setRecipes(response.data);
            
        } catch (err) {console.error(err);}
    }

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                if(userID){
                    const response = await axios.get(`http://localhost:3001/auth/user/${userID}`);
                    setCurrentUsername(response.data.username);
                }
                
            } catch (err) {console.error(err);}
        }

        const fetchVotedRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/get-recipes/${userID}`);
                setVotedRecipes(response.data.votedRecipes);
                
            } catch (err) {console.error(err);}
        }

        fetchRecipes();
        getCurrentUser();
        if(cookies.access_token) fetchVotedRecipes();
    }, [cookies.access_token, userID])

    const voteUp = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID})
            setVotedRecipes(response.data.votedRecipes);
            fetchRecipes();
          
        } catch(err) {console.log(err);}

    }

    const isRecipeVoted = (recipeID) => Array.isArray(votedRecipes) && votedRecipes.includes(recipeID);


    return (
        <div className="row justify-content-center mt-4">
            {recipes.map((item, idx) => (
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

                        {/* Right side content with thumbs up icon and vote count */}
                        <div className="d-flex flex-column align-items-center mr-5">
                            
                                <i 
                                    onClick={() => {if(!isRecipeVoted(item._id)) voteUp(item._id)}} style={{color: isRecipeVoted(item._id) ? "blue" : "grey" }}
                                    className={`fas fa-thumbs-up fa-2x mb-2 link-like ${(isRecipeVoted(item._id) || !cookies.access_token) && "disabled"}`}></i>
                       
                            <span>{item.votes} votes</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}