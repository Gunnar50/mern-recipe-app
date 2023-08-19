import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


export default function Recipe() {
    const {recipeID} = useParams();
    const [recipe, setRecipe] = useState(null);
    
    useEffect(() => {
        const getRecipe = async() => {
            try{
                const response = await axios.post("http://localhost:3001/recipes/id", {recipeID});
                setRecipe(response.data.recipe);
            }catch(err) {console.log(err);}
        }

        getRecipe();
    }, [])

    return (
        <div>Recipe {console.log(recipe)}</div>
    )
}
