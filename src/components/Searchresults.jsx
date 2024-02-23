import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Searchresults = () => {
	const collection = useSelector((state) => state.games.collection);
	const gamesResults = useSelector((state) => state.games.collection.results);

	return (
		<>
			<Row xs={1} sm={5} className="my-4">
				{collection &&
					gamesResults &&
					gamesResults.map((game) => (
						<Col key={game.id}>
							<Card className="bg-dark white mb-3">
								<Card.Img variant="top" src={game.background_image} className="card-pic" />
								<Card.Body>
									<Card.Title className="line-clamp">{game.name}</Card.Title>
									{game.name.length < 20 && <Card.Text className="m-0">&nbsp;</Card.Text>}
									<Card.Text>
										<span>{game.released}</span>
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
