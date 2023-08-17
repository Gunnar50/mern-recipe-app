import axios from 'axios';

export const verifyUserToken = async (token) => {
    console.log("token: ", token);
    try {
        const response = await axios.get('http://localhost:3001/auth/verify-token', {
            headers: {
                'Authorization': token
            }
        });
        return response.data.valid;
    } catch (error) {
        return false;
    }
};
