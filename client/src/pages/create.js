import { useState } from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom"

export const Create = () => {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        description: "",
        image: "",
        cookingTime: 0,
        creator: window.localStorage.getItem("userID"),
    });

    const [ingredientInput, setIngredientInput] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    }

    const handleIngredientAdd = () => {
        if (ingredientInput) {
            setRecipe(prevRecipe => ({
                ...prevRecipe,
                ingredients: [...prevRecipe.ingredients, ingredientInput]
            }));
            setIngredientInput("");
        }
    }

    const handleIngredientRemove = (index) => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: prevRecipe.ingredients.filter((_, i) => i !== index)
        }));
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (recipe.ingredients.length === 0) {
            alert('Please add at least one ingredient.');
            return;
        }
        try {
            await axios.post("http://localhost:3001/recipes/create", recipe);
            alert("Recipe Created!");
            navigate("/");
        } catch (err) {console.error(err);}
    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card card-body p-5">
                <form onSubmit={onSubmit}>
                    <h2 className="card-title">Create Recipe</h2>
                    <div className="form-group">
                        <input required={true} className="form-control" type="text" id="name" name="name" placeholder="Recipe Name" onChange={handleChange} />
                    </div>

                    <ul className="mt-3 pl-3">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="d-flex justify-content-between align-items-center">
                                {ingredient}
                                <button type="button" className="btn btn-danger btn-sm mt-1" onClick={() => handleIngredientRemove(index)}>
                                    <span>X</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="form-group d-flex">
                        <input 
                            className="form-control" 
                            type="text" 
                            id="ingredientInput" 
                            name="ingredientInput" 
                            value={ingredientInput}
                            onChange={(e) => setIngredientInput(e.target.value)}
                            placeholder="Add Ingredient" 
                        />
                        <button type="button" className="btn btn-secondary ml-2" onClick={handleIngredientAdd}>Add</button>
                    </div>

                    <div className="form-group">
                        <textarea required={true} className="form-control" type="text" id="description" name="description" placeholder="Recipe Description" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input required={true} className="form-control" type="text" id="image" name="image" placeholder="Image" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input required={true} className="form-control" type="text" id="cookingTime" name="cookingTime" placeholder="Cooking Time" onChange={handleChange} />
                    </div>
                    <button required={true} className="btn btn-primary" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}
