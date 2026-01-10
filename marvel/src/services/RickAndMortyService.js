import { useHttp } from "../hooks/http.hook";

const useRmService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://rickandmortyapi.com/api";
  const _pageSize = 20;
  const MAX_CHARACTERS = 826;

  const getAllCharacters = async (offset = 0) => {
    const page = Math.floor(offset / _pageSize) + 1;
    const res = await request(`${_apiBase}/character?page=${page}`);
    return res.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/character/${id}`);
    return _transformCharacter(res);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}/character/?name=${name}`);
    return res.results.map(_transformCharacter);
  };

  const getRandomCharacter = async () => {
    const id = Math.floor(Math.random() * MAX_CHARACTERS) + 1;
    const res = await request(`${_apiBase}/character/${id}`);
    return _transformCharacter(res);
  };

  const getResource = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
  };

  const getEpisode = async (id) => {
      const res = await getResource(`${_apiBase}/episode/${id}`);
      return _transformEpisode(res);
  };

  const getAllEpisodes = async (offset = 0) => {
      const page = Math.floor(offset / _pageSize) + 1;
      const res = await request(`${_apiBase}/episode?page=${page}`);
      return res.results.map(_transformEpisode);
  };

  const _transformEpisode = (episode) => ({
      id: episode.id,
      name: episode.name,
      airDate: episode.air_date,
      episode: episode.episode,
      characters: episode.characters.map(url =>
        Number(url.match(/\/(\d+)$/)[1])
      )
  });

  const _transformCharacter = (char) => ({
    id: char.id,
    name: char.name,
    description: `${char.species} — ${char.status}`,
    thumbnail: char.image,
    gender: char.gender,
    origin: char.origin?.name || 'Unknown',
    location: char.location?.name || 'Unknown',
    episodes: char.episode.map(url =>
      Number(url.match(/\/(\d+)$/)[1])
    )
  });


  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getAllEpisodes,
    getCharacter,
    getCharacterByName,
    getRandomCharacter,
    getEpisode
  };
};

export default useRmService;


