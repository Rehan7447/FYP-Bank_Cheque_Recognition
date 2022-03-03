import React from "react";
import Header from "../../components/header/header";
import Feature from "../../components/landingPage/features/feature";
import Heading from "../../components/landingPage/heading/heading";
import "./LandingPage.css";
import image1 from "../../assets/banner.jpg";
export default function LandingPage() {
	// useEffect(() => {
	//     const userInfo = localStorage.getItem("userInfo");
	//     if(userInfo){
	//         history.push("/notes")
	//     }
	// }, [history])
	return (
		<div className="landingMain">
			<div className="backOverlay"></div>
			<div className="landingContent">
				<Header />
				<Heading id="#features" />
				<div className="featuresDiv" id="features">
					<Feature heading="Secure" image={image1}>
						description to be displayed about the feaytuer
					</Feature>
					<Feature heading="Reliable" image={image1}>
						description to be displayed about the feaytuer
					</Feature>
					<Feature heading="Time Savy" image={image1}>
						description to be displayed about the feaytuer
					</Feature>
				</div>
			</div>
		</div>
	);
}
