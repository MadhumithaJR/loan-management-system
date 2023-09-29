import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
// const ROOT_URL = "http://127.0.0.1:5000"

function Logout(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['id'])
    let navigate = useNavigate();
    if(cookies.id)
          {
            removeCookie('id',{ path: '/' });
          }
    
    useEffect(()=>{
        
        props.fxn(false);
        navigate('/');
    })
}

export default Logout