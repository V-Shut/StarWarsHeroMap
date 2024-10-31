export	async function fetchAllHeroes() {
  const heroes = [];
  for (let page = 1; ; page++) {
    const data = await fetch(
      `https://sw-api.starnavi.io/people/?page=${page}`
    ).then((response) => {
      if (!response.ok) {
        return;
      }

      return response.json();
    });

    if (data) {
      heroes.push(data.results);
    } else {
      break;
    }
  }
  
  return heroes.flat().sort((a, b) => a.id - b.id);
}

export async function fetchHeroById(id: number) {
	const data = await fetch(`https://sw-api.starnavi.io/people/${id}`).then(
		(response) => {
			if (!response.ok) {
				throw new Error("Error fetching hero data");
			}

			return response.json();
		}
	);

	return data;
}

export async function fetchAllStarships() {
  const starships = [];
  for (let page = 1; ; page++) {
    const list = await fetch(
      `https://sw-api.starnavi.io/starships/?page=${page}`
    ).then((response) => {
      if (!response.ok) {
        return;
      }

      return response.json();
    });

    if (list) {
      starships.push(...list.results);
    } else {
      break;
    }
  }
  
  return starships;
}

export async function fetchAllFilms() {
  const data = await fetch("https://sw-api.starnavi.io/films").then(
    (response) => {
      if (!response.ok) {
        throw new Error("Error fetching episodes data");
      }

      return response.json();
    }
  );

  return data.results;
}
