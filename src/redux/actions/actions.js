export const GET_GAMES = "GET_GAMES";
export const GET_GENRE = "GET_GENRE";
export const GET_DEVELOPER = "GET_DEVELOPER";
export const GET_RELEASEDDATE = "GET_RELEASEDDATE";
export const RESET_GAMES = "RESET_GAMES";
export const SET_QUERY = "SET_QUERY";
export const GET_GAMES_DETAILS = "GET_GAMES_DETAILS";
export const SET_LOGIN = "SET_LOGIN";
export const SET_REGISTER = "SET_REGISTER";

export const getGames = () => {
	return async (dispatch, getState) => {
		try {
			const query = getState().games.query;
			const response = await fetch(
				"https://api.rawg.io/api/games?key=04174db6a00f49f1a4cb3455de38c381&search=" + query
			);
			if (!response.ok) {
				throw new Error("Errore nella fetch");
			}
			const gamesCollection = await response.json();
			dispatch({
				type: GET_GAMES,
				payload: gamesCollection,
			});
		} catch (error) {
			console.error(error);
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
				throw new Error("Errore nella fetch");
			}
			const gamesCollection = await response.json();
			dispatch({
				type: GET_GENRE,
				payload: gamesCollection,
			});
		} catch (error) {
			console.error(error);
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
				throw new Error("Errore nella fetch");
			}
			const gamesCollection = await response.json();
			dispatch({
				type: GET_DEVELOPER,
				payload: gamesCollection,
			});
		} catch (error) {
			console.error(error);
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
				throw new Error("Errore nella fetch");
			}
			const gamesCollection = await response.json();
			dispatch({
				type: GET_RELEASEDDATE,
				payload: gamesCollection,
			});
		} catch (error) {
			console.error(error);
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
				throw new Error("Errore nella fetch");
			}
			const gameDetailsCollection = await response.json();
			dispatch({
				type: GET_GAMES_DETAILS,
				payload: gameDetailsCollection,
			});
		} catch (error) {
			console.error(error);
		}
	};
};

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`http://localhost:8000/users?username=${username}&password=${password}`);
			if (!response.ok) {
				throw new Error("Errore di rete");
			}
			const data = await response.json();
			if (data.length > 0) {
				const token = `${Date.now()}`;

				dispatch({
					type: SET_LOGIN,
					payload: { user: data[0], token },
				});
				return Promise.resolve();
			} else {
				throw new Error("Credenziali non valide");
			}
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	};
};

export const register = (regUser) => {
	return async (dispatch) => {
		try {
			const response = await fetch("http://localhost:8000/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(regUser),
			});
			if (!response.ok) {
				throw new Error("Errore durante la registrazione");
			}
			const userData = await response.json();
			dispatch({
				type: SET_REGISTER,
				payload: userData,
			});
		} catch (error) {
			console.error(error);
		}
	};
};
