import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "./verify-token";


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
        try {
            const response = await axios.post("http://localhost:3001/auth/login", 
                { 
                    username,
                    password 
                });
            
            const token = response.data.token;
            const userID = response.data.userID;
            if(!token) {
                console.log(response.data.message);
                setUsername("");
                setPassword("");   
                return;
            }

            // Immediately verify token after successful login
            if(!verifyToken(token)) return;
            
            setCookies("access_token", token);
            window.localStorage.setItem("userID", userID);
            navigate("/");

        } catch (err) {
            console.error(err);
            alert(err.response ? err.response.data.message : "Error occurred during login.");
        }
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
                <input className="form-control" type="text" id="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="password" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button className="btn btn-primary" type="submit">{label}</button>
        </form>
    )
}


