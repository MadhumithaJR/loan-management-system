import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home container-fluid">
        <div className="row">
            {/* <div className="col-md-6 col-sm-12 pt-5 home-page-info">
                <div>
                    <h2>This is Home Page</h2>
                    <p>
                    <br></br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies 
                    convallis est, sed porttitor mi dignissim at. Nunc elit lorem, tincidunt non mauris 
                    quis, tincidunt pharetra purus. Proin quis porttitor mi. Vivamus sit amet lacus nibh. 
                    Aliquam vel est dui. Nullam eget dui lectus. Etiam non est est.<br></br>
                    <br></br><br></br>

                    Aliquam accumsan nisl sed purus mattis auctor. Praesent diam odio, maximus at arcu at, 
                    Nunc ut tristique tortor. Pellentesque habitant morbi tristique senectus et netus et 
                    malesuada fames ac turpis egestas. Pellentesque tortor purus, malesuada quis orci id, 
                    lacinia lobortis dolor. Vivamus tempus dui et nisl<br></br><br></br> consequat, scelerisque lobortis dui 
                    elementum. Phasellus sodales metus at posuere sagittis. Phasellus at fermentum lacus. 
                    Donec quis risus eu dolor feugiat feugiat. Phasellus cursus erat vitae mi consequat, 
                    eu dapibus erat varius. Integer sed est non mi faucibus efficitur nec ut justo. Nam 
                    
                    </p>
                </div>
            </div> */}
            <div className="col-md-6 col-sm-12  login-side">
                <div>
                    <p>Already a user?</p>
                    <button class="btn btn-outline-secondary btn-light" onClick={() => navigate("/login")}>Login</button>
                </div>

                <div>
                    <p>Register to apply for loan..</p>
                    <button class="btn btn-outline-secondary btn-light" onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
        </div>
        
        
        
        </div>
    )
}


export default Home;