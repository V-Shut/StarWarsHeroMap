import { useEffect } from "react";
import "./App.css";
import { startStarAnimation } from "./background_animation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HeroesList } from "./components/heroesList";
import { HeroDetails } from "./components/heroDetails";

function App() {
	useEffect(() => {
		startStarAnimation();
	}, []);

	return (
		<div className="App">
			<div
				id="universe"
				className="universe">
				<img
					src="img/yoda_logo.png"
					className="yoda_logo"
					alt="yoda_logo"
				/>
				<img
					src="img/vader_logo.png"
					className="vader_logo"
					alt="vader_logo"
				/>
				<Routes>
					<Route
						path="/"
						element={<HeroesList />}
					/>
					<Route
						path="/:heroID"
						element={<HeroDetails />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
