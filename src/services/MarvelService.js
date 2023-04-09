class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=f0f78042985ef6470c7dc2ef4d8b5380";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      new Error(`Could not fetch ${url}, check the status: ${res.status}`);
    }
    return await res.json();
  };

  //делаєм запроси до api

  //отримуєм усіх персонажів
  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=100&${this._apiKey}`
    ); //берем данні з акк арі
  };

  getCharacterId = (id) => {
    // отримуємо одного персонжа по id
    return this.getResource(`${this._apiBase}characters${id}?${this._apiKey}`);
  };
}

export default MarvelService;
