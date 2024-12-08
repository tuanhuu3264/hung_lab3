const fetch = require("node-fetch");

class Movie {
  async getAll() {
    try {
      const response = await fetch(`http://matuan.online:2422/api/Movies`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw new Error("Failed to fetch movies.");
    }
  }

  async getById(id) {
    try {
      const response = await fetch("http://matuan.online:2422/api/Movies");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const movies = await response.json();
      const movie = movies.find((movie) => movie.id === id);

      if (!movie) {
        throw new Error(`Movie with ID ${id} not found.`);
      }

      return movie;
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error);
      throw new Error(`Failed to fetch movie with ID ${id}.`);
    }
  }

  async getTopRated() {
    try {
      const response = await fetch(`http://matuan.online:2422/api/Top50Movies`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
      throw new Error("Failed to fetch top-rated movies.");
    }
  }

  async getTopRevenue() {
    try {
      const response = await fetch(
        `http://matuan.online:2422/api/MostPopularMovies`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching top-revenue movies:", error);
      throw new Error("Failed to fetch top-revenue movies.");
    }
  }
}

module.exports = Movie;
