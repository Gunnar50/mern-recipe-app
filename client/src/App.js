import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/home"
import {Auth} from "./pages/auth"
import {Create} from "./pages/create"
import {Saved} from "./pages/saved"
import {NavBar} from "./components/navbar"
import ProtectedRoute from './routes/ProtectedRoute';


function App() {
  return (
	<div className="App">
		<Router>
			<NavBar/>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/auth' element={<Auth/>} />
				<Route path='/create' element={<ProtectedRoute component={Create}/>} />
				<Route path='/saved' element={<Saved/>} />
			</Routes>
		</Router>
	</div>
  );
}

export default App;
