import { SET_LOGIN, SET_REGISTER } from "../actions/actions";

const initialState = {
	loggedInUser: null,
	registeredUser: [],
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGIN:
			return {
				...state,
				loggedInUser: action.payload.length > 0 ? action.payload[0] : null,
			};
		case SET_REGISTER:
			return {
				...state,
				registeredUser: action.payload,
			};
		default:
			return state;
	}
};
