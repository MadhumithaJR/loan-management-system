import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
        <>
        <div>
            <h2>This is Home Page</h2>
        </div>
        
        <div>
            <p>Already a user?</p>
            <button class="btn btn-outline-secondary btn-light" onClick={() => navigate("/login")}>Login</button>
        </div>

        <div>
            <p>Register to apply for loan..</p>
            <button class="btn btn-outline-secondary btn-light" onClick={() => navigate("/register")}>Register</button>
        </div>
        </>
    )
}


export default Home;