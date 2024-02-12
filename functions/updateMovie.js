import prompt from "prompt-sync";
import { updateGenres } from "./updateGenres.js";
import { updatedRating } from "./updateRating.js";
import { updatedCast } from "./updateCast.js";

export async function updateMovie(Movie) {
  const p = prompt();

  try {
    const allMovies = await Movie.find(
      {},
      "title director releaseYear genres cast ratings"
    );

    if (allMovies.length === 0) {
      console.log("No movies found in the database.");
      return;
    }
    console.log("----------------------------------------------");
    console.log("List of movies:");
    allMovies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title}`);
    });
    console.log("----------------------------------------------");
    const movieId = parseInt(p("Enter the ID of the movie to update: "));

    if (isNaN(movieId) || movieId < 1 || movieId > allMovies.length) {
      console.log("Invalid movie ID.");
      return;
    }

    const selectedMovie = allMovies[movieId - 1];
    console.log("----------------------------------------------");
    console.log(`Selected movie: ${selectedMovie.title}`);
    console.log(`director: ${selectedMovie.director}`);
    console.log(`Release year: ${selectedMovie.releaseYear}`);
    console.log(`Genres: ${selectedMovie.genres}`);
    console.log(`Ratings: ${selectedMovie.ratings}`);
    console.log(`Cast: ${selectedMovie.cast}`);
    console.log("----------------------------------------------");
    console.log("Choose what you want to edit:");
    console.log("1. Title");
    console.log("2. Director");
    console.log("3. Release Year");
    console.log("4. Genres");
    console.log("5. Ratings");
    console.log("6. Cast");
    console.log("7. Exit app");

    const editOption = p("Enter your choice: ");

    switch (editOption) {
      case "1":
        console.log("----------------------------------------------");
        console.log(`Current Title: ${selectedMovie.title}`);
        const newTitle = p(`Enter new Title: `);
        selectedMovie.director = newTitle;
        break;
      case "2":
        console.log("----------------------------------------------");
        console.log(`Current Director: ${selectedMovie.director}`);
        const newDirector = p(`Enter new director's name: `);
        selectedMovie.director = newDirector;
        break;
      case "3":
        console.log(`Current release year: ${selectedMovie.releaseYear}`);
        const newReleaseYear = parseInt(p("Enter new release year: "));
        selectedMovie.releaseYear = newReleaseYear;
        break;
      case "4":
        updateGenres(selectedMovie);
        break;
      case "5":
        updatedRating(selectedMovie);
        break;
      case "6":
        updatedCast(selectedMovie);
        break;
      case "7":
        console.log("Exiting app.");
        console.log("----------------------------------------------");
        process.exit;
        return;
      default:
        console.log("Invalid choice.");
        return;
    }

    await selectedMovie.save();
    console.log("----------------------------------------------");
    console.log(`Movie '${selectedMovie.title}' updated successfully.`);
    console.log("----------------------------------------------");
  } catch (error) {
    console.error("Error updating movie:", error);
  }
}
