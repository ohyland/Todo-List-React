import { Todo } from "../App";
import {
	RemoveTodoActionType,
	AddTodoActionType,
} from "../actions/todos.actions";

type DefaultState = {
	todos: Todo[];
};

// initialising it with a property called todos and setting it to an empty array
const defaultState: DefaultState = { todos: [] };
/**
 * A reducer takes two arguments, the current state and an action.
 */

export type AppState = ReturnType<typeof reducer>;
const reducer = (
	state = defaultState,
	action: RemoveTodoActionType | AddTodoActionType
) => {
	switch (action.type) {
		case "ADD_TODO": {
			return { ...state, todos: [...state.todos, action.payload] };
		}
		case "REMOVE_TODO": {
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload.id),
			};
		}
		default:
			return state;
	}
};

export default reducer;
