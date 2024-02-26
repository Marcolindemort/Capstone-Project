import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/actions";

const Register = ({ handleCloseReg, show }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		const setId = Math.floor(Math.random() * 1000);
		const regUser = { id: setId, username, email, password };
		console.log(regUser);

		dispatch(register(regUser));
		handleCloseReg();
	};

	return (
		<Modal show={show} centered onHide={handleCloseReg}>
			<Modal.Header closeButton>
				<Modal.Title className="text-dark">Registrati</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Username</Form.Label>
						<Form.Control
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							type="text"
							placeholder="Inserisci il tuo Username"
							autoFocus
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							type="email"
							placeholder="Inserisci la tua Email"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							type="password"
							placeholder="Inserisci la tua Password"
							required
						/>
					</Form.Group>
					<div className="d-flex justify-content-end">
						<button className="orange archive-sm border-orange" type="submit">
							REGISTRATI
						</button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default Register;
