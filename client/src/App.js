import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { NavBar } from "./components/navbar";
import { UserContextProvider } from './contexts/Context';
import { Auth } from "./pages/auth";
import { Create } from "./pages/create";
import { Home } from "./pages/home";
import { MyRecipes } from './pages/my-recipes';
import Recipe from './pages/recipe';
import { Edit } from './pages/recipe-edit';
import { Saved } from "./pages/saved";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";


function App() {
  return (
	<div className="App">
		<UserContextProvider>
			<BrowserRouter>
				<NavBar/>
				<Routes>
					<Route path='/' element={<Home/>} exact />
					<Route path='/auth' element={<Auth/>} />
					<Route element={<ProtectedRoutes/>}>
						<Route path='/create' element={<Create />} />
						<Route path='/saved' element={<Saved/>} />
						<Route path='/my-recipes' element={<MyRecipes/>} />
						<Route path='/recipe/:recipeID' element={<Recipe/>} />
					<Route path='/my-recipes/:recipeID' element={<Edit/>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	</div>
  );
}

export default App;
