import React, { useState, Dispatch } from "react";
import { createUseStyles } from "react-jss";

import { addTodoAction, AddTodoActionType } from "../actions/todos.actions";
import { connect } from "react-redux";
import { Todo } from "../App";
import Button from "./Button";

type InnerProps = MappedDispatch;
type OuterProps = {}; // we don't have any
type Props = InnerProps & OuterProps;

// Styles

const useStyles = createUseStyles({
	form: {
		display: "flex",
		justifyContent: "space-between",
		position: "relative",
	},
	input: {
		width: "100%",
		fontSize: "16px",
		background: "white",
		padding: "3%",
		border: "2px solid #e0f0ff",
		borderRadius: "5px",
		boxShadow: "0px 3px 19px 1px rgba(0,0,0,0.23)",
		fontFamily: "Montserrat, sans-serif",
	},
});
const CreateTodo = ({ handleAddTodo }: Props) => {
	// State
	const [textInput, setTextInput] = useState<string>("");
	const classes = useStyles();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); //prevent refresh

		if (!textInput) {
			// if textInput is empty dont return anything.
			return;
		} else {
			//creates an object with two properties
			handleAddTodo({ id: Date.now(), description: textInput });
			setTextInput("");
		}
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<input
				className={classes.input}
				placeholder="What do you need to do?"
				value={textInput}
				type="text"
				onChange={(e) => setTextInput(e.target.value)}
			/>
			<Button btnText={"submit"} type={"submit"} />
		</form>
	);
};

type MappedDispatch = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: Dispatch<AddTodoActionType>) => {
	return {
		handleAddTodo: (todo: Todo) => dispatch(addTodoAction(todo)),
	};
};

export default connect<{}, MappedDispatch, OuterProps>(
	null,
	mapDispatchToProps
)(CreateTodo);

// In the connect function we can tell it what types to expect now. The order is important
