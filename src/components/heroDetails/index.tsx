import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactFlow, { Edge, Node } from "reactflow";
import "reactflow/dist/style.css";
import "./style.css";
import { Loader } from "../loader";

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

type Starship = {
	id: number;
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	max_atmosphering_speed: string;
	crew: string;
	passengers: string;
	cargo_capacity: string;
	consumables: string;
	hyperdrive_rating: string;
	MGLT: string;
	starship_class: string;
	pilots: number[];
	films: number[];
	created: string;
	edited: string;
	url: string;
};

const colors = ['yellow', 'green', 'blue', 'purple', 'orange', 'red']

export const HeroDetails = () => {
	const [hero, setHero] = useState<Hero | undefined>(undefined);
	const [starships, setStarships] = useState<Starship[]>([]);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const location = useLocation();

	useEffect(() => {
		fetchHero();
		fetchStarships();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (hero && starships) {
			let newNodes: Node[] = [];
			let newEdges: Edge[] = [];

			const heroNode = {
				id: "hero",
				type: "input",
				data: { label: hero.name },
				position: { x: 0, y: 50 },
				className: "node",
			};

			newNodes.push(heroNode);

			hero.films.forEach((film, filmIndex) => {
				newNodes.push({
					id: `film-${film}`,
					data: { label: `Episode ${film}` },
					position: { x: 50 + filmIndex * 200, y: 200 },
					className: "node",
				});

				newEdges.push({
					id: `edge-${filmIndex}`,
					source: "hero",
					target: `film-${film}`,
					className: "edge",
				});

				const starshipsInFilm = starships.filter((ship) =>
					ship.films.includes(film)
				);

				starshipsInFilm.forEach((ship, shipIndex) => {
					newNodes.push({
						id: `starship-${ship.id}`,
						data: { label: ship.name },
						position: { x: (filmIndex * 200), y: (shipIndex * 200) + 300 },
						className: "node",
					});

					newEdges.push({
						id: `edge-${ship.id}`,
						source: `film-${film}`,
						target: `starship-${ship.id}`,
            className: "edge",
            style: {stroke: colors[filmIndex]}
					});
				});
			});

			setNodes(newNodes);
			setEdges(newEdges);
		}
	}, [hero, starships]);

	async function fetchStarships() {
		const starships = [];
		for (let i = 1; ; i++) {
			const list = await fetch(
				`https://sw-api.starnavi.io/starships/?page=${i}`
			).then((response) => {
				if (!response.ok) {
					return;
				}

				return response.json();
			});

			if (list) {
				starships.push(list.results);
			} else {
				break;
			}
		}

		setStarships(starships.flat());
	}

	async function fetchHero() {
		await fetch(
			`https://sw-api.starnavi.io/people/${location.pathname
				.split("")
				.slice(1)
				.join("")}`
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error fetching hero data");
				}

				return response.json();
			})
			.then((data) => setHero(data));
	}

	if (!hero) {
		return <Loader />;
	}

	console.log(starships);

	return (
		<div className="hero_container">
			<ReactFlow
				nodes={nodes}
				edges={edges}
			/>
		</div>
	);
};
