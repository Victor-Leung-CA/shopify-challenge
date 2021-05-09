const axios = require('axios');

//Fetch movies from OMDb API
const getMovies = async (searchInput) => {
    try {
        let key = process.env.REACT_APP_API_KEY;
        const response = await axios.get('https://www.omdbapi.com/?apikey=' + key + '&s=' + searchInput);
        console.log(response);
        return(response.data);

      } catch (error) {
        console.error(error);
      }
}

export default getMovies;
