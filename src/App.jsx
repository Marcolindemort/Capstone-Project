import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Searchbar from "./components/Searchbar";
import Home from "./components/Home";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Searchresults from "./components/Searchresults";
import GameDetails from "./components/GameDetails";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Container>
					<Searchbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/search/:games" element={<Searchresults />} />
						<Route path="/details/:slug" element={<GameDetails />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</div>
	);
}

export default App;
