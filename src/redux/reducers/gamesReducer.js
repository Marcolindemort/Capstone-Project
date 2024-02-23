import {
	GET_DEVELOPER,
	GET_GAMES,
	GET_GAMES_DETAILS,
	GET_GENRE,
	GET_RELEASEDDATE,
	RESET_GAMES,
	SET_QUERY,
} from "../actions/actions";

const initialState = {
	collection: [],
	query: "",
	gameDetails: [],
};

export const gamesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_GAMES:
		case GET_GENRE:
		case GET_DEVELOPER:
		case GET_RELEASEDDATE:
			return {
				...state,
				collection: action.payload,
			};
		case RESET_GAMES:
			return {
				...state,
				collection: [],
			};
		case SET_QUERY:
			return {
				...state,
				query: action.payload,
			};
		case GET_GAMES_DETAILS:
			return {
				...state,
				gameDetails: action.payload,
			};
		default:
			return state;
	}
};
