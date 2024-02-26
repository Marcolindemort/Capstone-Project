import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/actions";

const Login = ({ handleCloseLog, show }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(login(username, password));
		handleCloseLog();
	};

	return (
		<Modal show={show} centered onHide={handleCloseLog}>
			<Modal.Header closeButton>
				<Modal.Title className="text-dark">Accedi</Modal.Title>
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
							ACCEDI
						</button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default Login;
