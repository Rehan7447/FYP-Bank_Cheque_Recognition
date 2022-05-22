import React from "react";
import Header from "../../components/header/header";
import Feature from "../../components/landingPage/features/feature";
import Heading from "../../components/landingPage/heading/heading";
import "./LandingPage.css";
import image1 from "../../assets/banner.webp";
import about from "../../assets/aboutUs.webp";
import secure from "../../assets/secure.webp";
import reliable from "../../assets/reliable.webp";
import fast from "../../assets/fast.webp";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Footer from "../../components/footer/footer";
export default function LandingPage() {
  // useEffect(() => {
  //     const userInfo = localStorage.getItem("userInfo");
  //     if(userInfo){
  //         history.push("/notes")
  //     }
  // }, [history])
  return (
    <div>
      <div className="landingContent ">
        <Header />
        <div className="landingBanner">
          <img src={image1} />
        </div>
        {/* <div className="backOverlay"></div> */}
        <Heading id="#features" />
        <div className="featuresDiv" id="features">
          <AnimationOnScroll animateIn="animate__slideInUp">
            <div className="row aboutUsMain container-fluid">
              <h3>About Us</h3>

              <div className="col-md-5 aboutContent">
                <AnimationOnScroll animateIn="animate__slideInLeft">
                  <p>
                    Our App breaks away from the custom trends of withdrawing
                    money from banks using cheques and introduces a new fast na
                    dmore inovative way to get the job done. Our application
                    takes an image of your cheque and scans and verifies the
                    cheque for you while you sit on your sofa and enjoy a cup of
                    tea!
                  </p>
                </AnimationOnScroll>
              </div>

              <div className="col-md-5 aboutImage ">
                <AnimationOnScroll animateIn="animate__slideInRight">
                  <img alt="online banking" src={about} />
                </AnimationOnScroll>
              </div>
            </div>
          </AnimationOnScroll>
          <div className="featureMain">
            <AnimationOnScroll animateIn="animate__slideInUp">
              <h3>Features</h3>
              <div className="row featureContent container-fluid">
                <div className="col-md-4 featureCards">
                  <AnimationOnScroll animateIn="animate__zoomIn">
                    <Feature heading="Secure" image={secure}>
                      Your data is 100% secure with us
                    </Feature>
                  </AnimationOnScroll>
                </div>
                <div className="col-md-4 featureCards">
                  <AnimationOnScroll animateIn="animate__zoomIn">
                    <Feature heading="Reliable" image={reliable}>
                      You can fully take trust in our application, our customers
                      feedback is most important to us!
                    </Feature>
                  </AnimationOnScroll>
                </div>
                <div className="col-md-4 featureCards">
                  <AnimationOnScroll animateIn="animate__zoomIn">
                    <Feature heading="Fast" image={fast}>
                      We provide fast and seemless services
                    </Feature>
                  </AnimationOnScroll>
                </div>
              </div>
            </AnimationOnScroll>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
