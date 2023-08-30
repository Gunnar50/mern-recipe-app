import axios from "axios";

export async function verifyToken(token) {
    try {
        const verifyResponse = await axios.get("http://localhost:3001/auth/verify-token", 
            {
                headers: { authorization: token }
            });
        if (!verifyResponse.data.valid) {
            console.log("Token verification failed!");
            return false;
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
} 