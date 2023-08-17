import { useNavigate } from 'react-router-dom';
import { verifyUserToken } from '../utils/verifyUserToken';
import { useEffect } from 'react';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isVerified = verifyUserToken(localStorage.getItem('access_token'));
    console.log(isVerified);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isVerified) {
            navigate("/");
        }
    }, [isVerified, navigate]);

    return (
        isVerified ? <Component {...rest} /> : null
    );
};

export default ProtectedRoute;
