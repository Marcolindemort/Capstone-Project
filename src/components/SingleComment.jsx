import { faBan, faFloppyDisk, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import profilo from "../media/profilo.png";

const SingleComment = ({ comment, user, fetchComments }) => {
	const [editedComment, setEditedComment] = useState(comment.review);
	const [isEditing, setIsEditing] = useState(false);

	const handleEdit = () => {
		const updatedComment = { ...comment, review: editedComment };

		fetch(`http://localhost:8000/reviews/${comment.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedComment),
		})
			.then((resp) => resp.json())
			.then((e) => {
				setIsEditing(false);
				fetchComments();
				setEditedComment(e.target.value);
			})
			.catch((error) => console.error(error));
	};

	const handleDelete = () => {
		fetch(`http://localhost:8000/reviews/${comment.id}`, {
			method: "DELETE",
		})
			.then(() => {
				fetchComments();
			})
			.catch((error) => console.error(error));
	};

	return (
		<Row className="justify-content-center align-items-center mb-5">
			<Col xs={2} lg={1} className="d-flex flex-column align-items-center">
				<img src={profilo} alt="profile pic" width={50} height={50} />
				<span className="orange archive-sm">{comment.user}</span>
			</Col>
			<Col xs={6} className="bg-dark rounded-5 p-4 align-items-start me-2 d-flex flex-column">
				{user && user.id === comment.userid && (
					<>
						{isEditing ? (
							<div>
								<FontAwesomeIcon
									icon={faFloppyDisk}
									onClick={handleEdit}
									style={{ color: "#f78528" }}
									className="pointer me-2"
								/>
								<FontAwesomeIcon
									icon={faBan}
									onClick={() => setIsEditing(false)}
									style={{ color: "#f78528" }}
									className="pointer ms-3"
								/>
							</div>
						) : (
							<div>
								<FontAwesomeIcon
									icon={faPencil}
									onClick={() => setIsEditing(true)}
									style={{ color: "#f78528" }}
									className="pointer me-3"
								/>
								<FontAwesomeIcon
									icon={faTrashCan}
									onClick={handleDelete}
									style={{ color: "#f78528" }}
									className="pointer ms-2"
								/>
							</div>
						)}
					</>
				)}
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
			<Col xs={2} lg={1} className="d-flex">
				<span className="orange archive-sm">Voto: {comment.vote}</span>
			</Col>
		</Row>
	);
};

export default SingleComment;
