import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const Trophies = ({ gameId }) => {
	const [trophies, setTrophies] = useState([]);

	const getTrophies = async () => {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games/${gameId}/achievements?key=04174db6a00f49f1a4cb3455de38c381`
			);
			const trophy = await response.json();
			setTrophies(trophy);
			console.log("trophies", trophies, "id", gameId);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (gameId !== undefined) {
			getTrophies();
		}
	}, [gameId]);

	return (
		<div>
			<Row className="">
				{trophies &&
					trophies.results &&
					trophies.results.length > 0 &&
					trophies.results.map((trophy) => (
						<Col xs={1} key={trophy.id} className="m-4">
							<img src={trophy.image} alt="" width={50} height={50} />
							<span>{trophy.name}</span>
							{/* <span>{trophy.description}</span> */}
						</Col>
					))}
			</Row>
		</div>
	);
};

export default Trophies;
