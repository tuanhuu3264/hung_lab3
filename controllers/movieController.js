const Movie = require("../models/movie");

const movieController = {
  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.getAll();
      res.json({ status: "success", data: movies });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  getMovieDetails: async (req, res) => {
    try {
      const movie = await Movie.getById(req.params.id);
      if (movie) {
        res.json({ status: "success", data: movie });
      } else {
        res.status(404).json({ status: "error", message: "Movie not found" });
      }
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
  getTopRankMovies: async (req, res) => {
    try {
      const movies = await Movie.getTopRated();
      res.json({ status: "success", data: movies });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
  getTopRevenueMovies: async (req, res) => {
    try {
      const movies = await Movie.getTopRevenue();
      res.json({ status: "success", data: movies });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};
module.exports = movieController;
