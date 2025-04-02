import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/error')
    },[])
    return (
        <h1>
            OOOPSSS! Something went wrong!
        </h1>
    );
};

export default ErrorPage;