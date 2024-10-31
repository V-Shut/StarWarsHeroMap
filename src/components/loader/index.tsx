import "./style.css";

export const Loader = () => {
	return (
		<div className="spinner" role="loader">
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
		</div>
	);
};
