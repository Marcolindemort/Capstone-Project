import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

const ScreenshotCarousel = ({ gameId }) => {
	const [screenshot, setScreenshot] = useState([]);

	const getScreenshot = async () => {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games/${gameId}/screenshots?key=04174db6a00f49f1a4cb3455de38c381`
			);
			const screen = await response.json();
			setScreenshot(screen.results);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (gameId !== undefined) {
			getScreenshot();
		}
	}, [gameId]);

	return (
		<div className="my-3">
			<Carousel touch={true} interval={null} slide={false} indicators={false}>
				{screenshot &&
					screenshot.map((screen) => (
						<Carousel.Item key={screen.id}>
							<img src={screen.image} alt="screenshot" className="carousel-img" />
						</Carousel.Item>
					))}
			</Carousel>
		</div>
	);
};

export default ScreenshotCarousel;
