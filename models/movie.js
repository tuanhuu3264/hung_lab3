const db = require("../db-provider.js");
class Movie {
  async getAll() {
    try {
      const movies = await db.any("SELECT * FROM movie");
      return movies;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw new Error("Failed to fetch movies.");
    }
  }

  async getById(id) {
    try {
      const movie = await db.oneOrNone("SELECT * FROM movie WHERE id = $1", [
        id,
      ]);
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
      const movies = await db.any(
        "SELECT * FROM movie ORDER BY im_db_rating DESC LIMIT 50"
      );
      return movies;
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
      throw new Error("Failed to fetch top-rated movies.");
    }
  }

  async getTopRevenue() {
    try {
      const movies = await db.any(
        `SELECT * 
       FROM movies
       ORDER BY CAST(REPLACE(REPLACE(cumulativeWorldwideGross, '$', ''), ',', '') AS NUMERIC) DESC
       LIMIT 50`
      );
      return movies;
    } catch (error) {
      console.error("Error fetching top-revenue movies:", error);
      throw new Error("Failed to fetch top-revenue movies.");
    }
  }

  async getPopular() {
    try {
      const movies = await db.any(
        "SELECT * FROM movies WHERE popularity > 50 ORDER BY popularity DESC LIMIT 50"
      );
      return movies;
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      throw new Error("Failed to fetch popular movies.");
    }
  }
}

module.exports = Movie;
