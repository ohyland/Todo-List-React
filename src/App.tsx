import React from "react";
import { createUseStyles } from "react-jss";

import CreateTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";

export type Todo = { id: number; description: string };

// styles
const useStyles = createUseStyles({
	App: {
		fontFamily: "Montserrat, sans-serif",
		margin: "0",
		padding: "0",
	},
	wrapper: {
		width: "350px",
		margin: "0 auto",
	},
	heading: {
		margin: "0",
		paddingTop: "0",
		letterSpacing: "2px",
		color: "grey",
		textAlign: "center",
	},
});

const App = () => {
	const classes = useStyles();

	return (
		<div className={classes.App}>
			<div className={classes.wrapper}>
				<header className={classes.heading}>
					<h1>My Todo List</h1>
					<CreateTodo />
				</header>
				<ListTodo />
			</div>
		</div>
	);
};

export default App;
