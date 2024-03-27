import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/actions";
import { Toast, ToastContainer } from "react-bootstrap";

const Login = ({ handleCloseLog, showLog }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	/* const loggedUser = useSelector((state) => state.account.loggedInUser); */

	const [showSuccess, setShowSuccess] = useState(false);
	const [showDanger, setShowDanger] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		if (username === "admin" && password === "admin") {
			setShowSuccess(true);
			dispatch(login(username, password));
		} else {
			setShowDanger(true);
		}
		handleCloseLog();
		setUsername("");
		setPassword("");
	};

	return (
		<>
			<Modal show={showLog} centered onHide={handleCloseLog}>
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
			<ToastContainer position="middle-center">
				<Toast bg="success" onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide>
					<Toast.Body>Accesso eseguito!</Toast.Body>
				</Toast>
				<Toast bg="danger" onClose={() => setShowDanger(false)} show={showDanger} delay={3000} autohide>
					<Toast.Body>Accesso non riuscito</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default Login;
