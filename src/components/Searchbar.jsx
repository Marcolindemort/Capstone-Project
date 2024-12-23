import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Dropdown, DropdownButton, Form, InputGroup, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDeveloper, getGames, getGenre, getReleasedDate, setQuery } from "../redux/actions/actions";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Searchbar = () => {
	const user = useSelector((state) => state.account.loggedInUser);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [showLog, setShowLog] = useState(false);
	const [showReg, setShowReg] = useState(false);

	const handleCloseLog = () => setShowLog(false);
	const handleShowLog = () => setShowLog(true);
	const handleCloseReg = () => setShowReg(false);
	const handleShowReg = () => setShowReg(true);

	const [value, setValue] = useState("");

	const [filterBy, setFilterBy] = useState("Filtra per:");

	const handleSearch = (event) => {
		event.preventDefault();
		let inputValue = value.trim();
		inputValue = inputValue.replace(/\s+/g, "-");
		if (inputValue !== "") {
			switch (filterBy) {
				case "Filtra per:":
					dispatch(setQuery(inputValue));
					dispatch(getGames());
					break;
				case "Titolo":
					dispatch(setQuery(inputValue));
					dispatch(getGames());
					break;
				case "Genere":
					dispatch(setQuery(inputValue));
					dispatch(getGenre());
					break;
				case "Sviluppatore":
					dispatch(setQuery(inputValue));
					dispatch(getDeveloper());
					break;
				case "Anno d'uscita":
					dispatch(setQuery(inputValue));
					dispatch(getReleasedDate());
					break;
				default:
					break;
			}
			navigate(`/search/${inputValue}`);
			setValue("");
			setQuery("");
		}
	};

	return (
		<>
			<Row className="justify-content-end">
				<Col xs={11} lg={6}>
					<InputGroup className="my-3 me-3 d-flex justify-content-center">
						<DropdownButton variant="dark" title={filterBy} id="input-group-dropdown-1">
							<Dropdown.Item onClick={() => setFilterBy("Titolo")}>Titolo</Dropdown.Item>
							<Dropdown.Item onClick={() => setFilterBy("Genere")}>Genere</Dropdown.Item>
							<Dropdown.Item onClick={() => setFilterBy("Sviluppatore")}>Sviluppatore</Dropdown.Item>
							<Dropdown.Item onClick={() => setFilterBy("Anno d'uscita")}>Anno d'uscita</Dropdown.Item>
						</DropdownButton>
						<Form onSubmit={handleSearch} className="m-0 d-flex">
							<Form.Control
								aria-label="Text input with dropdown button"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder="Cerca nell'archivio"
								className="rounded-start-0"
							/>
							<button className="orange archive-sm ms-2 border-orange" type="submit">
								Cerca
							</button>
						</Form>
					</InputGroup>
				</Col>
				<Col xs={0} lg={3} className="d-flex flex-column-reverse justify-content-center align-items-center mt-4">
					<div className="mt-1">{user && <span>Benvenuto/a, {user.username}!</span>}</div>
					<div>
						<Link to="/" className="orange me-3">
							<FontAwesomeIcon icon={faHouse} size="xl" />
						</Link>
						<OverlayTrigger
							trigger="click"
							key="bottom"
							placement="bottom"
							overlay={
								<Popover id="popover-positioned-bottom">
									<Popover.Body>
										<button className="orange archive-sm border-orange mb-3" onClick={handleShowLog}>
											ACCEDI
										</button>
										<br></br>
										<button className="orange archive-sm border-orange" onClick={handleShowReg}>
											REGISTRATI
										</button>
									</Popover.Body>
								</Popover>
							}
							rootClose={true}>
							<FontAwesomeIcon icon={faUser} size="xl" className="orange pointer ms-3" />
						</OverlayTrigger>
					</div>
				</Col>
			</Row>
			<Login handleCloseLog={handleCloseLog} showLog={showLog} />
			<Register handleCloseReg={handleCloseReg} show={showReg} />
		</>
	);
};

export default Searchbar;
