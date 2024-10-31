import { render, screen } from "@testing-library/react";
import App from "./App";
import { startStarAnimation } from "./background_animation";
import { MemoryRouter } from "react-router-dom";

jest.mock("./background_animation");
jest.mock("./components/heroesList", () => ({
	HeroesList: () => <div role="hero-list">Hero List</div>,
}));

describe("App Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders without crashing", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		const yodaLogo = screen.getByAltText("yoda_logo");
		const vaderLogo = screen.getByAltText("vader_logo");

		expect(yodaLogo).toBeInTheDocument();
		expect(vaderLogo).toBeInTheDocument();
	});

	it("renders HeroList component", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByRole("hero-list")).toBeInTheDocument();
	});

	it("calls startStarAnimation on mount", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(startStarAnimation).toHaveBeenCalled();
	});
});
