import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./pages/home"
import {Auth} from "./pages/auth"
import {Create} from "./pages/create"
import {Saved} from "./pages/saved"
import {NavBar} from "./components/navbar"
import Recipe from './pages/recipe';
import { MyRecipes } from './pages/my-recipes';


function App() {
  return (
	<div className="App">
		<BrowserRouter>
			<NavBar/>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/auth' element={<Auth/>} />
				<Route path='/create' element={<Create />} />
				<Route path='/saved' element={<Saved/>} />
				<Route path='/my-recipes' element={<MyRecipes/>} />
				<Route path='/recipe/:recipeID' element={<Recipe/>} />
			</Routes>
		</BrowserRouter>
	</div>
  );
}

export default App;
