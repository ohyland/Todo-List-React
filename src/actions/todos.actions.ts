import { Todo } from "../App";

export type AddTodoActionType = ReturnType<typeof addTodoAction>;
export const addTodoAction = (todo: Todo) => {
	return { type: "ADD_TODO", payload: todo };
};

export type RemoveTodoActionType = ReturnType<typeof removeTodoAction>;
export const removeTodoAction = (todo: Todo) => {
	return { type: "REMOVE_TODO", payload: todo };
};