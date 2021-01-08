import React from "react";
import { createUseStyles } from "react-jss";

type InnerProps = {};
type OuterProps = {
	btnText: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	type: "button" | "submit";
};
type Props = InnerProps & OuterProps;
// styles
const useStyles = createUseStyles({
	btn: {
		color: "white",
		position: "absolute",
		textTransform: "uppercase",
		fontSize: "10px",
		border: "none",
		height: "20px",
		right: "12px",
		top: "26%",
		display: "flex",
		alignItems: "center",
		borderRadius: "50px",
		justifyContent: "center",
	},
	submitBtn: {
		backgroundColor: "#1976d2",
		"&:hover": {
			backgroundColor: "#0056AC",
		},
	},
	removeBtn: {
		backgroundColor: "#dc004e",
		"&:hover": {
			backgroundColor: "#B60040",
		},
	},
});

const Button = ({ btnText, onClick, type }: Props) => {
	const classes = useStyles();

	return (
		<button
			className={`${classes.btn} ${
				btnText === "submit" ? classes.submitBtn : classes.removeBtn
			}`}
			onClick={onClick}
			type={type}
		>
			{btnText}
		</button>
	);
};

export default Button;
