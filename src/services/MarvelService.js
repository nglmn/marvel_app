class MarvelService {
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
      "https://gateway.marvel.com:443/v1/public/characters?apikey=f0f78042985ef6470c7dc2ef4d8b5380"
    ); //берем данні з акк арі
  };
}

export default MarvelService;
