import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({duration: 1200,once:true});
const AboutUs = () => {
    return ( 
        <div>
            <div className="container-fluid">
                <div className="row p-5 text-start w-75" >
                    <div data-aos = "fade-right">
                    <h5>About Us</h5>
                    <p>
                    Welcome to Loan management, your trusted partner in financial management and loan 
                    services.
                    <br />
                    At Loan management, we understand the importance of financial stability and the 
                    role it plays in achieving your dreams and aspirations. That's why we're dedicated 
                    to providing you with a seamless and secure platform to manage your loans and make 
                    informed financial decisions.
                    </p>   
                    </div>
                    <div data-aos = "fade-right">
                    <h5>Our Mission</h5>
                    <p>
                    Our mission is to empower individuals and businesses with the tools and knowledge they
                    need to take control of their finances and achieve their financial goals. We believe 
                    that everyone deserves access to fair and transparent loan solutions, and we're committed 
                    to making that a reality.
                    </p>
                    </div>
                    <div data-aos = "fade-right">
                    <h5>
                        Why choose us?
                    </h5>    
                    <ul class="list-group list-group-flush w-50">
                        <li class="list-group-item">Expertise</li>
                        <li class="list-group-item">Innovation </li>
                        <li class="list-group-item">Transparency</li>
                        <li class="list-group-item">Security</li>
                        <li class="list-group-item">Personalized Solutions</li>
                    </ul> 
                    </div>
                    <div data-aos = "fade-right">
                    <h5>Join Us Today</h5>
                    <p>
                    Whether you're an individual looking for a personal loan or a business 
                    owner seeking financial solutions, We are here to support you on your financial 
                    journey. Join our growing community of satisfied customers and experience the 
                    difference that our loan management app can make in your financial life.
                    </p>
                    </div>
                             
                    

                    

                    
                </div>

            </div>
            
        </div>
    );
};

export default AboutUs;
