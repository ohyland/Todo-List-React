import React, { Dispatch, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { connect } from "react-redux";
import Button from "./Button";

import {
	removeTodoAction,
	RemoveTodoActionType,
} from "../actions/todos.actions";

import type { Todo } from "../App";
import { AppState } from "../reducers/todos.reducer";
import { getTodos } from "../services/todos.services";

type InnerProps = MappedState & MappedDispatch;
type OuterProps = {}; // we don't have any
type Props = InnerProps & OuterProps;

// styles
const useStyles = createUseStyles({
	listTodo: {
		padding: "0",
	},
	listTodos: {
		fontFamily: "Montserrat, sans-serif",
		display: "flex",
		justifyContent: "space-between",
		backgroundColor: "white",
		borderRadius: "5px",
		margin: "2% 0",
		padding: "3%",
		boxShadow: "0px 3px 19px 1px rgba(0,0,0,0.23)",
		position: "relative",
		listStyleType: "none",
	},
});

const ListTodo = ({ removeTodo, todos }: Props) => {
	const classes = useStyles();
	useEffect(() => {
		getTodos();
	}, []);

	return (
		<ul className={classes.listTodo}>
			{todos.map((todo, index) => (
				<li className={classes.listTodos} key={index}>
					{todo.description}
					<Button
						onClick={() => removeTodo(todo)}
						btnText={"remove"}
						type={"button"}
					/>
				</li>
			))}
		</ul>
	);
};

type MappedState = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: AppState) => {
	return {
		todos: state.todos,
	};
};
type MappedDispatch = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: Dispatch<RemoveTodoActionType>) => {
	return {
		removeTodo: (todo: Todo) => dispatch(removeTodoAction(todo)),
	};
};

export default connect<MappedState, MappedDispatch, OuterProps, AppState>(
	mapStateToProps,
	mapDispatchToProps
)(ListTodo);
