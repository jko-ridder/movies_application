import mongoose from "mongoose";
import prompt from "prompt-sync";
import { addNewMovie } from "./functions/newMovie.js";
import { updateMovie } from "./functions/updateMovie.js";
import { deleteMovie } from "./functions/deleteMovie.js";
import { allMovies } from "./functions/allMovies.js";

mongoose.connect("mongodb://localhost:27017/johan-ridder-movies");

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  releaseYear: Number,
  genres: [String],
  ratings: [Number],
  cast: [String],
});

const Movie = mongoose.model("Movie", movieSchema, "movies");

async function runQuerys() {
  try {
    const p = prompt();

    while (true) {
      console.log("----------------------------------------------");
      console.log("Menu");
      console.log("1. View all movies");
      console.log("2. Insert a new movie");
      console.log("3. Update a movie");
      console.log("4. Delete a movie");
      console.log("5. Exit");
      console.log("----------------------------------------------");
      let input = p("Make choice by entering a number: ");
      switch (input) {
        case "1":
          await allMovies(Movie);
          break;
        case "2":
          await addNewMovie(Movie);
          break;
        case "3":
          await updateMovie(Movie);
          break;
        case "4":
          await deleteMovie(Movie);
          break;
        case "5":
          console.log("Exiting app.");
          process.exit();
        default:
          console.log(
            "Invalid choice, try again by choosing number between 1-5"
          );
          break;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
runQuerys();
