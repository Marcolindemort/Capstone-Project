import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import { Col, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const CommentArea = () => {
	const gameid = useSelector((state) => state.games.gameDetails.id);
	const user = useSelector((state) => state.account.loggedInUser);

	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [vote, setVote] = useState(5);

	const handleComment = () => {
		if (!newComment) return;
		const commentReview = { gameid, user: user.username, userid: user.id, review: newComment, vote };

		fetch("http://localhost:8000/reviews", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(commentReview),
		})
			.then((resp) => {
				return resp.json();
			})
			.then(() => {
				setNewComment("");
				setVote(5);
				fetchComments();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleVoteChange = (selectedVote) => {
		setVote(selectedVote);
	};

	const fetchComments = async () => {
		try {
			const response = await fetch("http://localhost:8000/reviews/?gameid=" + gameid);
			if (!response.ok) {
				throw new Error("Errore nella fetch");
			}
			const comments = await response.json();
			setComments(comments);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (gameid) {
			fetchComments();
		}
	}, [gameid]);

	return (
		<>
			<h2 className="mt-5 archive orange">Recensioni</h2>
			<div className="border-orange mb-5 pt-5">
				<div className="mt-4">
					{comments &&
						comments.map((comment, index) => (
							<SingleComment key={index} comment={comment} user={user} fetchComments={fetchComments} />
						))}
				</div>
				<Row className="justify-content-center my-5">
					<Col xs={10} md={8} lg={6}>
						<InputGroup>
							<Form.Control
								as="textarea"
								aria-label="With textarea"
								className="rounded-3"
								placeholder="Scrivi una recensione..."
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
							/>
							<div className="d-flex align-items-center">
								<span className="me-2 ms-3">Voto:</span>
								<DropdownButton title={vote} variant="light" onSelect={handleVoteChange}>
									{[...Array(10)].map((params, index) => (
										<Dropdown.Item key={index + 1} eventKey={index + 1} className="item">
											{index + 1}
										</Dropdown.Item>
									))}
								</DropdownButton>
							</div>
						</InputGroup>
						{!user ? (
							<button className="mt-3 orange archive-sm border-orange" onClick={handleComment} disabled>
								Invia
							</button>
						) : (
							<button className="mt-3 orange archive-sm border-orange" onClick={handleComment}>
								Invia
							</button>
						)}
					</Col>
				</Row>
			</div>
		</>
	);
};

export default CommentArea;
