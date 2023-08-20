import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


export default function Recipe() {
    const {recipeID} = useParams();
    const [recipe, setRecipe] = useState(null);
    const [currentUsername, setCurrentUsername] = useState("");
    const userID = window.localStorage.getItem("userID");
    
    useEffect(() => {
        const getRecipe = async() => {
            try{
                const response = await axios.get(`http://localhost:3001/recipes/get-recipes/${recipeID}`);
                setRecipe(response.data.recipe);
            }catch(err) {console.log(err);}
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
        getRecipe();
    }, [])

    if (!recipe) return null;

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-10 card card-body">
                <div className="d-flex justify-content-between">
                    {/* Image on the left side */}
                    <div>
                        <img src={recipe.image} alt="Recipe" className="img-fluid" style={{ maxWidth: '300px' }} />
                    </div>

                    {/* Middle content with title, description, and view link */}
                    <div style={{ flex: 2, margin: '0 20px' }}>
                        <h1 className="card-title">{recipe.name}</h1>
                        <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
                        <p><strong>Author:</strong> {recipe.creator.username ? recipe.creator.username === currentUsername ? `${recipe.creator.username} (Me)` : recipe.creator.username : 'Unknown'}</p>
                    </div>
                    
                </div>

                <div className="d-flex justify-content-between mt-5">
                    <div style={{ flex: 1, margin: '0 20px' }}>
                        <h3 className="card-title">Ingredients</h3>
                        <ul>
                            {recipe.ingredients.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Middle content with title, description, and view link */}
                    <div style={{ flex: 2, margin: '0 20px' }}>
                        <h3 className="card-title">Description</h3>
                        <p>{recipe.description}</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
