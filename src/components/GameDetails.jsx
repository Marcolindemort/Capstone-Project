import { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGamesDetails } from "../redux/actions/actions";
import { useParams } from "react-router-dom";
import CommentArea from "./CommentArea";
import ScreenshotCarousel from "./ScreenshotCarousel";
import Trophies from "./Trophies";

const GameDetails = () => {
	const game = useSelector((state) => state.games.gameDetails);
	const dispatch = useDispatch();
	const { slug } = useParams();

	useEffect(() => {
		dispatch(getGamesDetails(slug));
	}, []);

	const [key, setKey] = useState("info");

	return (
		<>
			{game && (
				<Row className="justify-content-center mt-5 bg-dark rounded-3">
					<Col xs={4} className=" p-0 rounded-3">
						<img src={game.background_image} alt="game pic" className="rounded-start-3 card-pic" />
					</Col>
					<Col xs={8} className="p-0">
						<Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 archive-sm">
							<Tab eventKey="info" title="INFO" className="text-start">
								<Container>
									<Row>
										<Col className="p-3">
											<p>
												<span className="fst-italic fw-bold orange">Titolo: </span>
												{game.name}
											</p>
											<div>
												<span className="fst-italic fw-bold orange">Genere: </span>
												{game.genres &&
													game.genres.map((genre, index) => (
														<ul key={index} className="list-unstyled lh-1">
															<li>{genre.name}</li>
														</ul>
													))}
											</div>
											{game.esrb_rating && (
												<p>
													<span className="fst-italic fw-bold orange">Rating ESRB: </span>
													{game.esrb_rating.name}
												</p>
											)}
											<p>
												<span className="fst-italic fw-bold orange">Media voti Metacritic: </span>
												{game.metacritic}
											</p>
											<div className="d-flex flex-row align-items-center">
												<span className="fst-italic fw-bold orange flex-start">Disponibile per: </span>
												{game.platforms &&
													game.platforms.map((platform, index) => (
														<ul key={index} className="list-unstyled lh-1 m-0">
															<li className="mx-2">{platform.platform.name}</li>
														</ul>
													))}
											</div>
										</Col>

										<Col className="p-3">
											<p>
												<span className="fst-italic fw-bold orange">Data di uscita: </span>
												{game.released}
											</p>

											<div>
												<span className="fst-italic fw-bold orange">Sviluppato da: </span>
												{game.developers &&
													game.developers.map((developer, index) => (
														<ul key={index} className="list-unstyled lh-1">
															<li>{developer.name}</li>
														</ul>
													))}
											</div>

											<div>
												<span className="fst-italic fw-bold orange">Pubblicato da: </span>
												{game.publishers &&
													game.publishers.map((publishers, index) => (
														<ul key={index} className="list-unstyled lh-1">
															<li>{publishers.name}</li>
														</ul>
													))}
											</div>
										</Col>
									</Row>
								</Container>
							</Tab>
							<Tab eventKey="descrizione" title="DESCRIZIONE">
								<p className="p-3">{game.description_raw}</p>
							</Tab>
							<Tab eventKey="galleria" title="GALLERIA">
								<ScreenshotCarousel gameId={game.id} />
							</Tab>
							{game.achievements_count > 0 && (
								<Tab eventKey="achievements" title="TROFEI/OBIETTIVI">
									<Trophies gameId={game.id} />
								</Tab>
							)}
						</Tabs>
					</Col>
				</Row>
			)}
			<CommentArea />
		</>
	);
};

export default GameDetails;

/* piattaforme V
data di uscita - invertire data
metacritic V
genere V
tag(?)
descrizione V
screenshot V
trailer
achievement V
edizioni(?) 


aspect-ratio
object-fit*/
