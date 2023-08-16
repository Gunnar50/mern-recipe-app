import { useState } from "react";
import axios from "axios";
import {useCookies} from "react-cookie"
import {Navigate, useNavigate} from "react-router-dom"


export const Auth = () => {
    return <div className="row justify-content-center mt-4">
        <Login />
        <Register />
    </div>
};


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [, setCookies] = useCookies(["access_token"])

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/auth/login", {username, password});
            
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
            console.log(response);

        } catch(err) {console.error(err)};
    }

    return (
        <div className="col-md-5 card card-body mr-md-3 p-5">
            <Form 
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                label="Login"
                onSubmit={onSubmit}
            />
        </div>
    )
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {username, password});
            alert("Registration Complete!");
        } catch (err) {console.error(err);}

    }
 
    return (
        <div className="col-md-5 card card-body p-5">
            <Form 
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                label="Sign Up"
                onSubmit={onSubmit}
            />
        </div>
    )
}

const Form = ({username, password, setUsername, setPassword, label, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <h2 className="card-title">{label}</h2>
            <div className="form-group">
                <input className="form-control" type="text" id="username" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="password" id="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button className="btn btn-primary" type="submit">{label}</button>
        </form>
    )
}


