import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Quotes = () => {
	const [quotes, setQuotes] = useState([]);

	const getQuotes = async () => {
		try {
			const response = await fetch("https://thingproxy.freeboard.io/fetch/https://ultima.rest/api/random");
			if (!response.ok) {
				throw "Errore nella fetch";
			}
			const randomQuotes = await response.json();
			setQuotes(randomQuotes);
			console.log(randomQuotes);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getQuotes();
	}, []);

	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={10}>
					<p className="m-0">"{quotes.quote}"</p>
					<span>
						{quotes.character} - {quotes.title}
					</span>
				</Col>
			</Row>
		</Container>
	);
};

export default Quotes;
