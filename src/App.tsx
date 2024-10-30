import { useEffect } from "react";
import "./App.css";
import { startStarAnimation } from "./background_animation.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HeroList } from "./components/heroesList";
import { HeroDetails } from "./components/heroDetails";

function App() {
	useEffect(() => {
		startStarAnimation();
	}, []);

	return (
		<Router>
			<div className="App">
				<div >
					<img
						src="img/yoda_logo.png"
						className="yoda_logo"
						alt="logo"
					/>
					<img
						src="img/vader_logo.png"
						className="vader_logo"
						alt="logo"
					/>

					<Routes>
						<Route
							path="/"
							element={<HeroList />}
						/>
						<Route
							path="/:heroName"
							element={<HeroDetails />}
						/>
					</Routes> 
				</div>
			</div>
		</Router>
	);
}

export default App;
