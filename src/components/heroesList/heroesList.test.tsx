import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HeroesList } from ".";
import { fetchAllHeroes, fetchHeroById } from "../../api/fetch";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { HeroDetails } from "../heroDetails";

jest.mock("../../api/fetch", () => {
	const actualFetchModule = jest.requireActual("../../api/fetch");
	return {
		fetchAllHeroes: jest.fn(),
	};
});

jest.mock("../heroDetails/index", () => ({
	HeroDetails: () => <div>hero details</div>,
}));

jest.mock("../../background_animation");

describe("heroesList component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders loader when data is not loaded", () => {
		render(
			<MemoryRouter>
				<HeroesList />
			</MemoryRouter>
		);

		const loader = screen.getByRole("loader");

		expect(loader).toBeInTheDocument();
	});

	it("loader disappears after fetching data", async () => {
		const data = [{ id: 1, name: "Harry Potter" }];
		(fetchAllHeroes as jest.Mock).mockResolvedValueOnce(data);

		render(
			<MemoryRouter>
				<HeroesList />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.queryByRole("loader")).not.toBeInTheDocument();
		});

		const hero = screen.getByText("Harry Potter");

		expect(hero).toBeInTheDocument();
	});

	it("renders pagination after fetching data", async () => {
		const data = [{ id: 1, name: "Harry Potter" }];
		(fetchAllHeroes as jest.Mock).mockResolvedValueOnce(data);

		render(
			<MemoryRouter>
				<HeroesList />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.queryByRole("loader")).not.toBeInTheDocument();
		});

		const pagination = screen.getByRole("pagination");

		expect(pagination).toBeInTheDocument();
	});

	it("changes elements after changing pagination page", async () => {
		const data: { id: number; name: string }[] = [];
		for (let i = 100; i <= 115; i++) {
			data.push({ id: i, name: i.toString() });
		}

		(fetchAllHeroes as jest.Mock).mockResolvedValueOnce(data);

		render(
			<MemoryRouter>
				<HeroesList />
			</MemoryRouter>
		);

		await waitFor(() => {
			data.slice(0, 10).forEach((el) => {
				expect(screen.getByText(el.name)).toBeInTheDocument();
			});
		});

		data.slice(10, 14).forEach((el) => {
			expect(screen.queryByText(el.name)).not.toBeInTheDocument();
		});

		const nextPageButton = screen.getByRole("next");
		fireEvent.click(nextPageButton);

		await waitFor(() => {
			data.slice(10, 14).forEach((el) => {
				expect(screen.getByText(el.name)).toBeInTheDocument();
			});
		});

		data.slice(0, 10).forEach((el) => {
			expect(screen.queryByText(el.name)).not.toBeInTheDocument();
		});
	});

	it("doesn`t change page when current page is last", async () => {
		const data: { id: number; name: string }[] = [];
		for (let i = 100; i <= 125; i++) {
			data.push({ id: i, name: i.toString() });
		}

		(fetchAllHeroes as jest.Mock).mockResolvedValueOnce(data);

		render(
			<MemoryRouter>
				<HeroesList />
			</MemoryRouter>
		);

		await waitFor(() => {
			data.slice(0, 10).forEach((el) => {
				expect(screen.getByText(el.name)).toBeInTheDocument();
			});
		});

		data.slice(10, 14).forEach((el) => {
			expect(screen.queryByText(el.name)).not.toBeInTheDocument();
		});

		const nextPageButton = screen.getByRole("next");
		fireEvent.click(nextPageButton);
		fireEvent.click(nextPageButton);

		await waitFor(() => {
			data.slice(20, 24).forEach((el) => {
				expect(screen.getByText(el.name)).toBeInTheDocument();
			});
		});

		data.slice(0, 20).forEach((el) => {
			expect(screen.queryByText(el.name)).not.toBeInTheDocument();
		});

		fireEvent.click(nextPageButton);

		await waitFor(() => {
			data.slice(20, 24).forEach((el) => {
				expect(screen.getByText(el.name)).toBeInTheDocument();
			});
		});

		data.slice(0, 20).forEach((el) => {
			expect(screen.queryByText(el.name)).not.toBeInTheDocument();
		});
	});

	it("changes page after click on hero", async () => {
		const data = [{ id: 1, name: "Kolya Orbit" }];
		(fetchAllHeroes as jest.Mock).mockResolvedValueOnce(data);

		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("Kolya Orbit")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Kolya Orbit"));

		await waitFor(() => {
			expect(screen.getByText("hero details")).toBeInTheDocument();
		});
	});

	it("pagination works right", async () => {
		const data: { id: number; name: string }[] = [];
		for (let i = 100; i <= 200; i++) {
			data.push({ id: i, name: i.toString() });
		}

		(fetchAllHeroes as jest.Mock).mockResolvedValueOnce(data);

		render(
			<MemoryRouter>
				<HeroesList />
			</MemoryRouter>
		);

		expect(screen.getByRole("loader")).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByRole("loader")).not.toBeInTheDocument();
		});

		expect(screen.getByText("100")).toBeInTheDocument();
		expect(screen.getByRole("pagination")).toBeInTheDocument();

		fireEvent.click(screen.getByText("3"));

		await waitFor(() => {
			expect(screen.getByText("120")).toBeInTheDocument();
		});
		expect(screen.getByText("129")).toBeInTheDocument();
    expect(screen.queryByText("130")).not.toBeInTheDocument();
    
		fireEvent.click(screen.getByText("5"));

		await waitFor(() => {
			expect(screen.getByText("140")).toBeInTheDocument();
		});
		expect(screen.getByText("149")).toBeInTheDocument();
    expect(screen.queryByText("150")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Prev"));

		await waitFor(() => {
			expect(screen.getByText("130")).toBeInTheDocument();
		});
		expect(screen.getByText("139")).toBeInTheDocument();
    expect(screen.queryByText("140")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Next"));

		await waitFor(() => {
			expect(screen.getByText("140")).toBeInTheDocument();
		});
		expect(screen.getByText("149")).toBeInTheDocument();
    expect(screen.queryByText("150")).not.toBeInTheDocument();
	});
});
