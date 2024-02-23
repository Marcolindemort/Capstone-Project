import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import profilo from "../media/profilo.png";

const SingleComment = ({ comment, user, fetchComments }) => {
	const [editedComment, setEditedComment] = useState(comment.review);
	const [isEditing, setIsEditing] = useState(false);

	console.log("commenti", comment);

	const handleEdit = () => {
		const updatedComment = { ...comment, review: editedComment };

		fetch(`http://localhost:8000/reviews/${comment.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedComment),
		})
			.then((resp) => resp.json())
			.then((e) => {
				console.log("Commento modificato:", updatedComment);
				setIsEditing(false);
				fetchComments();
				setEditedComment(e.target.value);
			})
			.catch((error) => console.log(error));
	};

	const handleDelete = () => {
		fetch(`http://localhost:8000/reviews/${comment.id}`, {
			method: "DELETE",
		})
			.then(() => {
				console.log("Commento eliminato:", comment.id);
				fetchComments();
			})
			.catch((error) => console.log(error));
	};

	return (
		<Row className="justify-content-center align-items-center mb-5">
			<Col xs={1} className="d-flex flex-column align-items-center me-5">
				<img src={profilo} alt="profile pic" width={50} height={50} />
				<span className="orange archive-sm">{comment.user}</span>
			</Col>
			<Col xs={6} className="bg-dark rounded-5 p-4 text-start me-2 d-flex flex-column">
				{isEditing ? (
					<textarea
						value={editedComment}
						onChange={(e) => setEditedComment(e.target.value)}
						className="bg-dark white"
					/>
				) : (
					<p className="m-0">{comment.review}</p>
				)}
			</Col>
			<Col xs={1} className="d-flex">
				<span className="orange archive-sm">Voto: {comment.vote}</span>
				{user && user.id === comment.userid && (
					<>
						{isEditing ? (
							<>
								<button className="orange archive-sm border-orange" onClick={handleEdit}>
									Salva
								</button>
								<button className="orange archive-sm border-orange" onClick={() => setIsEditing(false)}>
									Annulla
								</button>
							</>
						) : (
							<>
								<button className="orange archive-sm border-orange" onClick={() => setIsEditing(true)}>
									Modifica
								</button>
								<button className="orange archive-sm border-orange" variant="danger" onClick={handleDelete}>
									Elimina
								</button>
							</>
						)}
					</>
				)}
			</Col>
		</Row>
	);
};

export default SingleComment;
