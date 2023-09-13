import API from "../api/index.js";

export async function verifyToken(token) {
    try {
        const verifyResponse = await API.get("/auth/verify-token", 
            {
                headers: { authorization: `Bearer ${token}` }
            });
        if (!verifyResponse.data.valid) {
            
            return false;
        }
        return true;
    } catch (err) {
        
        return false;
    }
} 