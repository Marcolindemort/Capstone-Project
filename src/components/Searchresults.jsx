import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Searchresults = () => {
	const collection = useSelector((state) => state.games.collection);
	const gamesResults = useSelector((state) => state.games.collection.results);

	const reverseDate = (date) => {
		if (collection && gamesResults) {
			if (!date) return "";
			const parts = date.split("-");
			return parts.reverse().join("-");
		}
	};

	return (
		<>
			<Row className="my-4 justify-content-center">
				{collection &&
					gamesResults &&
					gamesResults.map((game) => (
						<Col xs={10} md={6} lg={4} xl={3} key={game.id}>
							<Card className="bg-dark white mb-5 border-card-orange overflow-hidden">
								<Card.Img variant="top" src={game.background_image} className="card-pic" />
								<Card.Body>
									<Card.Title className="line-clamp">{game.name}</Card.Title>
									<Card.Text>
										{game.released ? (
											<span className="orange">
												Uscita: <span className="white">{reverseDate(game.released)}</span>
											</span>
										) : (
											<span className="orange">
												Uscita: <span className="white">non disponibile</span>
											</span>
										)}
										<br></br>
										<span className="orange">
											Genere:
											<span className="white justify-content-center">
												{game.genres.length >= 1 ? (
													game.genres
														.filter((genre, index) => index < 3)
														.map((genre, index) => <span key={index}>&nbsp;{genre.name}</span>)
												) : (
													<span>&nbsp;non disponibile</span>
												)}
											</span>
										</span>
									</Card.Text>

									<Link to={`/details/${game.slug}`}>
										<button className="orange archive-sm border-orange">Dettagli</button>
									</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
			</Row>

			{collection.next && (
				<Link>
					<button className="orange archive-sm border-orange mb-5">Succ.</button>
				</Link>
			)}
			{collection.previous && <button className="orange archive-sm border-orange mb-5">Prec.</button>}
		</>
	);
};

export default Searchresults;
