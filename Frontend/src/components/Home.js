import { useNavigate } from "react-router-dom";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import { Icon } from "@mui/material";
const Home = () => {
    const navigate = useNavigate();
    const handleLoginButton = () => {
       
        console.log("Log In Button");
        navigate('/login');
      }
    return (
        <div className="home">
         <div style={{marginLeft:'90vw', marginTop:'2vh'}}>
          {<button class="btn btn-outline-secondary btn-light" onClick={handleLoginButton} >
                Login
            </button> }
        </div>
            <div className = "container-fluid p-5 color-2">
                <div className = "row ">
                    <div className = "col intro-head">
                        <h1>
                            Transforming<br /> Banking for <br />success
                        </h1>
                    </div>
                </div>
                <div class = "row intro-text">
                    <div class = "col">
                        <p>
                            Discover the innovative solutions that drive growth and efficiency in <br />the manufacturing industry.
                        </p>
                        <div className="pt-3">
                        <button type="button" class="btn btn-outline-dark" onClick={() => navigate("/aboutus")}>Learn more</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="backg-img">
            </div>
        
            <div class="container-fluid color-1 p-5">
	            <div class="row">
	                <div class="col-md-12 text-left  about-2" data-aos = "fade-right" data-aos-duration = "1000">
	                    <h2>
	                        About Us
	                    </h2> 
	                    <p>
                            At Loan management, we understand the importance of financial stability and the 
                            role it plays in achieving your dreams and aspirations. That's why we're dedicated 
                            to providing you with a seamless and secure platform to manage your loans and make 
                            informed financial decisions. <br/>

                	    </p>
	                </div>
	    
	            </div>
	        </div>

            <div className="container-fluid color-2 p-5">
                <div className="row">
                    <h1>Our Services</h1>
                </div>
                <div className="row">
                    <div className="col-md-4 p-5">
                        <CreditScoreIcon/>
                        <p className="p-3">Our bank provides the customers with easy-lending process</p>
                    </div>
                    <div className="col-md-4 p-5">
                        <AttachMoneyIcon/>
                        <p className="p-3">Our bank provides the customers with easy-lending process</p>
                    </div>
                    <div className="col-md-4 p-5">
                        <CategoryIcon/>
                        <p className="p-3">Our bank provides the customers with easy-lending process</p>
                    </div>
                </div>
            </div>

            <div className="container-fluid color-1 p-5">
                <div className="row">
                    <h2>Our customers feedback</h2>
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <p> This bank has an awesome team and a dedicated staff. I am very impressed by their vision, hard work, outstanding performance, and wonferful team-mates. Their reputation is well-earned. </p>
                            </div>
                            <div class="carousel-item">
                                <p> Have always had nothing but excellent service in a comfortable and pleasant atmosphere in the six years I have been using this branch!</p>
                            </div>
                            <div class="carousel-item">
                                <p> This organization will deliver nothing less than the best from expertise and professionalism to top-notch communication. You’re sure to be impressed! </p>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        
        </div>
    )
}


export default Home;