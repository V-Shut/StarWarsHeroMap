import { useEffect, useState } from "react";
import "./style.css";
import { Loader } from "../loader";
import { Pagination } from "../pagination";

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
	const [heroList, setHeroList] = useState<Hero[]>([]);
	const [currPage, setCurrPage] = useState(1);
  
	// this constant is responsible for the number of elements displayed on one page
	const [pageElements, setPageElements] = useState(10);

	// this constant is responsible for the number of pages
	const pageQuantity = Array.from(
		{ length: Math.ceil(heroList.length / pageElements) },
		(_, index) => index + 1
  );
  


	function redirect(id: number) {
		window.location.href = `${id}`;
	}

	async function fetchHeroes() {
		const pages = [];
		for (let page = 1; page <= 9; page++) {
			const data = await fetch(
				`https://sw-api.starnavi.io/people/?page=${page}`
			).then((response) => {
				if (!response.ok) {
					throw new Error("Couldn`t fetch page");
				}

				return response.json();
			});

			pages.push(data.results);
		}

		setHeroList(pages.flat().sort((a, b) => a.id - b.id));
	}

	function changePage(direct: string) {
		switch (true) {
			case currPage === 1 && direct === "prev":
				return;

			case currPage === pageQuantity[pageQuantity.length - 1] &&
				direct === "next":
				return;

			default:
				break;
		}

		switch (direct) {
			case "next":
				setCurrPage((prev) => prev + 1);
				return;

			case "prev":
				setCurrPage((prev) => prev - 1);
				return;

			default:
				return;
		}
	}

	useEffect(() => {
		const mainElement = document.querySelector(".main") as HTMLElement;

		if (mainElement) {
			switch (true) {
				case pageElements <= 10:
					mainElement.style.gridTemplateColumns = `repeat(${2}, 1fr)`;
					break;

				case pageElements <= 20:
					mainElement.style.gridTemplateColumns = `repeat(${3}, 1fr)`;
					break;
			}
		}
	}, [pageElements]);

	useEffect(() => {
    fetchHeroes();
	}, []);

	return (
		<>
			{!pageQuantity.length && <Loader />}
			<div className="main">
				{heroList
					?.filter(
						(_hero, index) =>
							index >= (currPage - 1) * pageElements &&
							index < currPage * pageElements
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
				currPage={currPage}
				setCurrPage={setCurrPage}
			/>
		</>
	);
};
