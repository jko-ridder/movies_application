import prompt from "prompt-sync";

export async function deleteMovie(Movie) {
  const p = prompt();

  try {
    const allMovies = await Movie.find({}, "title");

    if (allMovies.length === 0) {
      console.log("no movies in database.");
      return;
    }
    console.log("----------------------------------------------");
    console.log("List of movies:");
    allMovies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title}`);
    });

    const movieId = parseInt(p("Enter the ID of the movie to Delete: "));

    if (isNaN(movieId) || movieId < 1 || movieId > allMovies.length) {
      console.log("Invalid movie ID.");
      console.log("----------------------------------------------");
      return;
    }

    const selectedMovie = allMovies[movieId - 1];
    console.log("----------------------------------------------");
    console.log(`Selected movie: ${selectedMovie.title}`);
    console.log("----------------------------------------------");
    console.log(
      `Are you sure you want to Delete this movie? ${selectedMovie.title}`
    );
    console.log("1. Yes");
    console.log("2. No");
    console.log("3. Exit");
    console.log("----------------------------------------------");
    const deleteOption = p("Make your decision: ");

    switch (deleteOption) {
      case "1":
        console.log(
          `Are you sure that you want to delete: ${selectedMovie.title}`
        );
        const confirmation = p(
          `Type '${selectedMovie.title}' to confirm your action: `
        );
        if (
          confirmation.trim().toLowerCase() ===
          selectedMovie.title.toLowerCase()
        ) {
          await Movie.deleteOne({ _id: selectedMovie._id });
          console.log(
            `Movie: ${selectedMovie.title} was Succesfully removed from database.`
          );
          console.log("----------------------------------------------");
        } else {
          console.log("----------------------------------------------");
          console.log("Validation failed. Movie deleting was cancelled.");
          console.log("----------------------------------------------");
        }
        break;
      case "2":
        console.log(`Deletion of ${selectedMovie.title} was cancelled.`);
        console.log("----------------------------------------------");
        break;
      case "3":
        console.log("Exiting...");
        console.log("----------------------------------------------");
        break;
      default:
        console.log("Invalid Choice.");
        break;
    }
  } catch (error) {
    console.error("Error deleting movie", error);
  }
}
