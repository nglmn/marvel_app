class MarvelService {
	_apiBase = "https://gateway.marvel.com:443/v1/public/";
	_apiKey = "apikey=f0f78042985ef6470c7dc2ef4d8b5380";
	_baseOfset = 200;

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			new Error(
				`Could not fetch ${url}, check the status: ${res.status}`,
			);
		}
		return await res.json();
	};

	//делаєм запроси до api

	//отримуєм усіх персонажів
	getAllCharacters = async (offset = this._baseOfset) => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`); //берем данні з акк арі
		return res.data.results.map(this._transformCharacter);
	};

	getCharacterById = async (id) => {
		// отримуємо одного персонжа по id
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = (character) => { //трансформує тільки необхідні данні із персонажу 
		return {
			id: character.id,
			name: character.name,
			description: character.description ? `${character.description.slice(0, 200)}...` : 'Sorry, there is no description for this character :)',
			thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
			homepage: character.urls[0].url,
			wiki: character.urls[1].url,
			comics: character.comics.items
		}
	}
}

export default MarvelService;
