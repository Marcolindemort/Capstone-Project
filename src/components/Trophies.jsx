import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const Trophies = ({ gameId }) => {
	const [trophies, setTrophies] = useState([]);
	const [activeTrophies, setActiveTrophies] = useState([]);

	const getTrophies = async (url) => {
		try {
			const response = await fetch(url);
			const trophy = await response.json();
			setTrophies(trophy);
			setActiveTrophies(Array(trophy.results.length).fill(false));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (gameId !== undefined) {
			getTrophies(`https://api.rawg.io/api/games/${gameId}/achievements?key=04174db6a00f49f1a4cb3455de38c381`);
		}
	}, [gameId]);

	const loadNextTrophies = () => {
		if (trophies.next) {
			getTrophies(trophies.next);
		}
	};

	const loadPreviousTrophies = () => {
		if (trophies.previous) {
			getTrophies(trophies.previous);
		}
	};

	const toggleTrophy = (index) => {
		setActiveTrophies((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});
	};

	return (
		<Row className="mt-2 justify-content-center">
			{trophies.previous && (
				<Col xs={1} className="mt-3 d-flex align-items-center p-0 justify-content-end justify-content-md-center">
					<FontAwesomeIcon icon={faChevronLeft} onClick={loadPreviousTrophies} size="xl" className="pointer" />
				</Col>
			)}
			<Col xs={5}>
				{trophies.results &&
					trophies.results.slice(0, 5).map((trophy, index) => (
						<div
							key={trophy.id}
							className={`d-flex my-3 align-items-center justify-content-start ${
								activeTrophies[index] ? "active-trophy" : ""
							}`}
							onClick={() => toggleTrophy(index)}>
							<img src={trophy.image} alt="achievements logo" width={50} height={50} className="me-3 pointer" />
							<span className="pointer">{trophy.name}</span>
						</div>
					))}
			</Col>
			{trophies.results && trophies.results.length > 5 && (
				<>
					<Col xs={5}>
						{trophies.results.slice(5).map((trophy, index) => (
							<div
								key={trophy.id}
								className={`d-flex my-3 align-items-center justify-content-start ${
									activeTrophies[index + 5] ? "active-trophy" : ""
								}`}
								onClick={() => toggleTrophy(index + 5)}>
								<img src={trophy.image} alt="achievements logo" width={50} height={50} className="me-3 pointer" />
								<span className="pointer">{trophy.name}</span>
							</div>
						))}
					</Col>
					<Col xs={1} className="mt-3 d-flex align-items-center p-0 justify-content-start">
						{trophies.next && (
							<FontAwesomeIcon icon={faChevronRight} onClick={loadNextTrophies} size="xl" className="pointer" />
						)}
					</Col>
				</>
			)}
		</Row>
	);
};

export default Trophies;
