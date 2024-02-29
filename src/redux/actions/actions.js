export const GET_GAMES = "GET_GAMES";
export const GET_GENRE = "GET_GENRE";
export const GET_DEVELOPER = "GET_DEVELOPER";
export const GET_RELEASEDDATE = "GET_RELEASEDDATE";
export const RESET_GAMES = "RESET_GAMES";
export const SET_QUERY = "SET_QUERY";
export const GET_GAMES_DETAILS = "GET_GAMES_DETAILS";
export const SET_LOGIN = "SET_LOGIN";
export const SET_REGISTER = "SET_REGISTER";

//sistemare gestione errori e loading

export const getGames = () => {
	return async (dispatch, getState) => {
		try {
			const query = getState().games.query;
			const response = await fetch(
				"https://api.rawg.io/api/games?key=04174db6a00f49f1a4cb3455de38c381&search=" + query
			);
			if (!response.ok) {
				throw "Errore nella fetch";
			}
			const gamesCollection = await response.json();
			dispatch({
				type: GET_GAMES,
				payload: gamesCollection,
			});
			console.log(gamesCollection);
		} catch (error) {
			console.log(error);
		}
	};
};

export const getGenre = () => {
	return async (dispatch, getState) => {
		try {
			const query = getState().games.query;
			const response = await fetch(
				"https://api.rawg.io/api/games?key=04174db6a00f49f1a4cb3455de38c381&genres=" + query
			);
			if (!response.ok) {
				throw "Errore nella fetch";
			}
			const gamesCollection = await response.json();
			dispatch({
				type: GET_GENRE,
				payload: gamesCollection,
			});
			console.log(gamesCollection);
		} catch (error) {
			console.log(error);
		}
	};
};

export const getDeveloper = () => {
	return async (dispatch, getState) => {
		try {
			const query = getState().games.query;
			const response = await fetch(
				"https://api.rawg.io/api/games?key=04174db6a00f49f1a4cb3455de38c381&developers=" + query
			);
			if (!response.ok) {
				throw "Errore nella fetch";
			}
			const gamesCollection = await response.json();
			dispatch({
				type: GET_DEVELOPER,
				payload: gamesCollection,
			});
			console.log(gamesCollection);
		} catch (error) {
			console.log(error);
		}
	};
};

export const getReleasedDate = () => {
	return async (dispatch, getState) => {
		try {
			const query = getState().games.query;
			const response = await fetch(
				`https://api.rawg.io/api/games?key=04174db6a00f49f1a4cb3455de38c381&dates=${query}-01-01,${query}-12-31`
			);
			if (!response.ok) {
				throw "Errore nella fetch";
			}
			const gamesCollection = await response.json();
			dispatch({
				type: GET_RELEASEDDATE,
				payload: gamesCollection,
			});
			console.log(gamesCollection);
		} catch (error) {
			console.log(error);
		}
	};
};

export const resetGames = () => ({ type: RESET_GAMES });

export const setQuery = (payload) => ({ type: SET_QUERY, payload });

export const getGamesDetails = (slug) => {
	return async (dispatch, getState) => {
		try {
			const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=04174db6a00f49f1a4cb3455de38c381`);
			if (!response.ok) {
				throw "Errore nella fetch";
			}
			const gameDetailsCollection = await response.json();
			dispatch({
				type: GET_GAMES_DETAILS,
				payload: gameDetailsCollection,
			});
			console.log("gameDetailsCollection", gameDetailsCollection);
		} catch (error) {
			console.log(error);
		}
	};
};

export const login = (username, password) => {
	return (dispatch) => {
		fetch("http://localhost:8000/users/?username=" + username)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.length > 0 && data.find((user) => user.username === username && user.password === password)) {
					console.log(data);
					dispatch({
						type: SET_LOGIN,
						payload: data,
					});
				} else {
					console.log("errore");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const register = (regUser) => {
	return (dispatch) => {
		fetch("http://localhost:8000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(regUser),
		})
			.then((resp) => {
				return resp.json();
			})
			.then((userData) => {
				dispatch({
					type: SET_REGISTER,
					payload: userData,
				});
				console.log("registrazione effettuata");
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
