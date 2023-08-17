import { useNavigate } from 'react-router-dom';
import { verifyUserToken } from '../utils/verifyUserToken';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [isVerified, setIsVerified] = useState(null);
    console.log(isVerified);
    const navigate = useNavigate();

    useEffect(() => {
        // this will verify the token and then update our state
        verifyUserToken(localStorage.getItem('access_token'))
            .then(result => {
                setIsVerified(result);
            })
            .catch(error => {
                console.error("Error verifying token:", error);
                setIsVerified(false);
            });
    }, []);  // empty dependency array means this effect will only run once, when the component mounts


    if (isVerified === null) return null;

    return (
        isVerified ? <Component {...rest} /> : navigate("/auth")
    );
};

export default ProtectedRoute;
