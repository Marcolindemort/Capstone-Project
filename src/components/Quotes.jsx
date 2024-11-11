import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Quotes = () => {
	/*const [quotes, setQuotes] = useState([]);

	const getQuotes = async () => {
		try {
			const response = await fetch("https://thingproxy.freeboard.io/fetch/https://ultima.rest/api/random");
			if (!response.ok) {
				throw new Error("Errore nella fetch");
			}
			const randomQuotes = await response.json();
			setQuotes(randomQuotes);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getQuotes();
	}, []);*/

	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={10}>
					<p className="m-0 fs-4 fst-italic">
						<FontAwesomeIcon icon={faQuoteLeft} style={{ color: "#f78528" }} size="xl" />
						{/* API di terze parti dedicata alle citazioni randomiche non più funzionante poiché a pagamento*/}
						&nbsp;This is gonna be weirder than usual.&nbsp;
						<FontAwesomeIcon icon={faQuoteRight} style={{ color: "#f78528" }} size="xl" />
					</p>
					<span className="fs-5">
						Jesse Faden - <span className="orange archive-sm">Control</span>
					</span>
				</Col>
			</Row>
		</Container>
	);
};

export default Quotes;
