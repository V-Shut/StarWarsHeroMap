import { useEffect, useState } from "react";
import "./style.css";
import { Loader } from "../loader";
import { Pagination } from "../pagination";
import { fetchAllHeroes } from "../../api/fetch";

type Hero = {
	id: number;
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: number;
	films: number[];
	species: number[];
	vehicles: number[];
	starships: number[];
	created: string;
	edited: string;
	url: string;
};

export const HeroList = () => {
	const [heroList, setHeroesList] = useState<Hero[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	// this constant is responsible for the number of elements displayed on one page
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [pageElements, _setPageElements] = useState(10);

	// this constant is responsible for the number of pages
	const pageQuantity = Array.from(
		{ length: Math.ceil(heroList.length / pageElements) },
		(_, index) => index + 1
	);

	// Fetch data when the component is mounted
	useEffect(() => {
		fetchData();
	}, []);

	function redirect(id: number) {
		window.location.href = `${id}`;
	}

	// Ensure page navigation stays within valid boundaries
	function changePage(direction: string) {
		const totalPages = pageQuantity[pageQuantity.length - 1];

		if (direction === "prev" && currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		} else if (direction === "next" && currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
		}
	}

	// Function to fetch and update hero state
	async function fetchData() {
		try {
			const heroes: Hero[] = await fetchAllHeroes();
			setHeroesList(heroes);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	if (!heroList.length) {
		return <Loader />;
	}

	return (
		<>
			<div className="main">
				{heroList
					?.filter(
						(_hero, index) =>
							index >= (currentPage - 1) * pageElements &&
							index < currentPage * pageElements
					)
					.map((hero) => (
						<div
							key={hero.id}
							className="hero"
							onClick={() => redirect(hero.id)}>
							{hero.name}
						</div>
					))}
			</div>
			<Pagination
				pageQuantity={pageQuantity}
				changePage={changePage}
				currPage={currentPage}
				setCurrPage={setCurrentPage}
			/>
		</>
	);
};
