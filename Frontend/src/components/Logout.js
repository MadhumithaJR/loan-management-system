import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function Logout(props) {
    const [cookies, setCookie,removeCookie] = useCookies(['user'])
    let navigate = useNavigate();
    removeCookie('id', { path: '/' });
    navigate('/');
    
}

export default Logout