import "./style.css";

interface Props {
	pageQuantity: number[];
	changePage: (direct: string) => void;
	currPage: number;
	setCurrPage: (number: number) => void;
}

export const Pagination: React.FC<Props> = ({
	pageQuantity,
	changePage,
	currPage,
	setCurrPage,
}) => {
	return (
		<div className="pagination" role="pagination">
			{!!pageQuantity.length && (
				<button
					className="nav_button"
					onClick={() => changePage("prev")}>
					Prev
				</button>
			)}
			{pageQuantity.map((number) => (
				<button
					key={`nav-${number}`}
					className={`nav_button ${
						number === currPage ? "choosed_button" : ""
					}`}
					onClick={() => setCurrPage(number)}>
					{number}
				</button>
			))}
			{!!pageQuantity.length && (
				<button
					className="nav_button"
					onClick={() => changePage("next")}
					role="next">
					Next
				</button>
			)}
		</div>
	);
};
