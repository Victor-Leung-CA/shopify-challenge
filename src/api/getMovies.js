const axios = require('axios');

//Fetch movies from OMDb API
const getMovies = async (searchInput) => {
    try {
        const response = await axios.get('http://www.omdbapi.com/?apikey=' + process.env.API_KEY + '&s=' + searchInput);
        console.log(response);
        return(response.data);

      } catch (error) {
        console.error(error);
      }
}

export default getMovies;
