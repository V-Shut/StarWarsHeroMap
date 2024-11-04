import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactFlow, { Edge, Node } from "reactflow";
import "reactflow/dist/style.css";
import "./style.css";
import { Loader } from "../loader";
import {
	fetchAllFilms,
	fetchAllStarships,
	fetchHeroById,
} from "../../api/fetch";

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

type Film = {
	id: number;
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: number[];
	planets: number[];
	starships: number[];
	vehicles: number[];
	species: number[];
	created: string;
	edited: string;
	url: string;
};

// Predefined colors for edges between nodes
const edgeColors = ["yellow", "green", "blue", "purple", "orange", "red"];

export const HeroDetails = () => {
	const [hero, setHero] = useState<Hero | undefined>(undefined);
	const [starships, setStarships] = useState<Starship[]>([]);
	const [episodes, setEpisodes] = useState<Film[]>([]);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const location = useLocation();

	useEffect(() => {
		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		createNodes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hero, starships, episodes]);
  
  // Fetch the hero, starships, and films data from the API
  async function fetchData() {
		const id: string = location.pathname.split("").slice(1).join("");
		try {
			const heroData: Hero = await fetchHeroById(Number(id));
			const starshipsData: Starship[] = await fetchAllStarships();
			const filmsData: Film[] = await fetchAllFilms();
			setHero(heroData);
			setStarships(starshipsData);
			setEpisodes(filmsData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

  // Create ReactFlow nodes and edges based on hero's films and starships
	function createNodes() {
		if (hero && !!starships.length) {
			let newNodes: Node[] = [];
			let newEdges: Edge[] = [];

			const heroNode = {
				id: "hero",
				type: "input",
				data: { label: hero.name },
				position: { x: 100, y: 200 },
        className: "node",
        role:'hero'
			};

			newNodes.push(heroNode);

			hero.films.forEach((film, filmIndex) => {
				const episode = episodes.find((el) => el.id === film);

				newNodes.push({
					id: `film-${film}`,
					data: { label: `Episode ${episode?.episode_id}: ${episode?.title}` },
					position: { x: 100 + filmIndex * 200, y: 400 },
					className: "node",
				});

				newEdges.push({
					id: `edge-${filmIndex}`,
					source: "hero",
					target: `film-${film}`,
					className: "edge",
				});

				const starshipsInFilm = starships.filter(
					(ship) =>
						ship.films.includes(film) && hero.starships.includes(ship.id)
				);

				starshipsInFilm.forEach((ship, shipIndex) => {
					newNodes.push({
						id: `starship-${ship.id}`,
						data: {
							label: `${ship.name}: ${ship.starship_class.toUpperCase()}`,
						},
						position: { x: filmIndex * 200 + 100, y: shipIndex * 150 + 500 },
						className: "node starship",
					});

					newEdges.push({
						id: `edge-${ship.name}-${shipIndex}`,
						source: `film-${film}`,
						target: `starship-${ship.id}`,
						className: "edge",
						style: { stroke: edgeColors[filmIndex] },
					});
				});
			});

			setNodes(newNodes);
			setEdges(newEdges);
    }
	}

	if (!hero) {
		return <Loader />;
	}

	return (
    <div className="hero_container" role="details">
      <div className="back_button" onClick={() => window.history.back()}>Back</div>
			<ReactFlow
				nodes={nodes}
				edges={edges}
			/>
		</div>
	);
};
