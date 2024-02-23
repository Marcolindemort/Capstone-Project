import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, resetGames, setQuery } from "../redux/actions/actions";
import { Link, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Slider = () => {
	const games = useSelector((state) => state.games.collection.results);
	const query = useSelector((state) => state.games.query);
	const dispatch = useDispatch();
	const location = useLocation();

	const [gameIndex, setGameIndex] = useState(Math.floor(Math.random() * 20));

	useEffect(() => {
		dispatch(resetGames());
		if (location.pathname === "/") {
			dispatch(setQuery(""));
		}
	}, [location.pathname]);

	useEffect(() => {
		dispatch(getGames(query));
	}, [query]);

	useEffect(() => {
		const interval = setInterval(() => {
			const random = Math.floor(Math.random() * games.length);
			setGameIndex(random);
		}, 8000);
		return () => clearInterval(interval);
	}, [games]);

	return (
		<>
			{games &&
				games.map((game, index) => (
					<div key={game.id} className="mt-5">
						{index === gameIndex && (
							<Row
								className={
									index === gameIndex
										? "content-slide active justify-content-center"
										: "content-slide justify-content-center"
								}>
								<Col xs={5} className="p-0">
									<Link to={`/details/${game.slug}`} className="p-0">
										<img
											src={game.background_image}
											alt="game pic"
											className="rounded-3 border-orange"
											width={"100%"}
											style={{ aspectRatio: "1/0.6", objectFit: "cover" }}
										/>
										<Col className="d-none d-lg-block">
											<p className="fw-bold orange archive-sm shadow">{game.name}</p>
										</Col>
									</Link>
								</Col>
							</Row>
						)}
					</div>
				))}
		</>
	);
};

export default Slider;
