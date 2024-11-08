import { SET_LOGIN, SET_REGISTER } from "../actions/actions";

const initialState = {
	loggedInUser: null,
	token: null,
	registeredUsers: [],
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGIN:
			return {
				...state,
				loggedInUser: action.payload.user,
				token: action.payload.token,
			};

		case SET_REGISTER:
			return {
				...state,
				registeredUsers: [...state.registeredUsers, action.payload],
			};

		default:
			return state;
	}
};
