const fetch = require("node-fetch");

class Actor {
  async getAll() {
    try {
      const response = await fetch(`http://matuan.online:2422/api/Names`);
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
      const response = await fetch("http://matuan.online:2422/api/Names");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const actors = await response.json();
      const actor = actors.find((actor) => actor.id === id);

      if (!actor) {
        throw new Error(`Actor with ID ${id} not found.`);
      }

      return actor;
    } catch (error) {
      console.error(`Error fetching actor with ID ${id}:`, error);
      throw new Error(`Failed to fetch actor with ID ${id}.`);
    }
  }
}

module.exports = Movie;
