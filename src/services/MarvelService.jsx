import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=f0f78042985ef6470c7dc2ef4d8b5380";
	const _baseOfset = 200;

	//отримуєм усіх персонажів
	const getAllCharacters = async (offset = _baseOfset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`); //берем данні з акк арі
		return res.data.results.map(_transformCharacter);
	};

	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getCharacterById = async (id) => {
		// отримуємо одного персонжа по id
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = 0) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	}

	const getComicById = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	}


	const _transformCharacter = (character) => { //трансформує тільки необхідні данні із персонажу 
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

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || 'Sorry, there is no description',
			pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
			language: comics.textObjects[0]?.language || 'en-us',
			price: comics.prices[0].price ? ` ${comics.prices[0].price}` : 'not available',
			thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
		}
	}


	return {
		loading,
		error,
		clearError,
		getAllCharacters,
		getCharacterByName,
		getCharacterById,
		getAllComics,
		getComicById
	}
}

export default useMarvelService;
