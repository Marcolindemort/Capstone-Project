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

	const reverseDate = (date) => {
		if (game) {
			if (!date) return "";
			const parts = date.split("-");
			return parts.reverse().join("-");
		}
	};

	return (
		<>
			{game && (
				<Row className="align-items-center align-items-lg-start mt-5 rounded-3 flex-column flex-lg-row flex-nowrap justify-content-lg-center bg-md-dark">
					<Col xs={10} lg={4} className="p-0">
						<img src={game.background_image} alt="game pic" className="rounded-start-3 card-pic" />
					</Col>
					<Col xs={10} lg={8} className="p-0 bg-dark rounded-3">
						<Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)} className="archive-sm">
							<Tab eventKey="info" title="INFO" className="text-start">
								<Container>
									<Row>
										<Col xs={6} className="py-3 ps-4">
											<p>
												<span className="fst-italic fw-bold orange">Titolo: </span>
												{game.name}
											</p>
											<div>
												<p className="fst-italic fw-bold orange mb-3">
													Genere:&nbsp;
													{game.genres &&
														game.genres.map((genre, index) => (
															<span key={index} className="white fw-normal fst-normal">
																{genre.name}&nbsp;
															</span>
														))}
												</p>
											</div>
											{game.esrb_rating && (
												<p className="fst-italic fw-bold orange">
													Rating ESRB:
													<span className="white fw-normal fst-normal"> {game.esrb_rating.name} </span>
												</p>
											)}
											<p>
												<span className="fst-italic fw-bold orange">Media voti Metacritic: </span>
												{game.metacritic}
											</p>
											<div className="d-flex flex-column align-items-start">
												<p className="fst-italic fw-bold orange justify-content-start flex-start m-0">
													Disponibile per:&nbsp;
												</p>
												{game.platforms &&
													game.platforms
														.filter((params, index) => index < 4)
														.map((platform, index) => <span key={index}>{platform.platform.name}&nbsp;</span>)}
											</div>
										</Col>

										<Col xs={6} className="py-3 ps-4">
											<p>
												<span className="fst-italic fw-bold orange">Data di uscita: </span>
												<br className="d-lg-none"></br>
												{reverseDate(game.released)}
											</p>

											<div>
												<span className="fst-italic fw-bold orange">Sviluppato da: </span>
												{game.developers &&
													game.developers
														.filter((params, index) => index < 3)
														.map((developer, index) => (
															<ul key={index} className="list-unstyled lh-1">
																<li>{developer.name}</li>
															</ul>
														))}
											</div>

											<div>
												<span className="fst-italic fw-bold orange">Pubblicato da: </span>
												{game.publishers &&
													game.publishers
														.filter((params, index) => index < 3)
														.map((publishers, index) => (
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
								<div className={game.description_raw && game.description_raw.length > 1500 ? "scroll-container" : ""}>
									<p className="p-4">{game.description_raw}</p>
								</div>
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
