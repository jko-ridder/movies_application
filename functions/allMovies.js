export async function allMovies(Movie) {
  const allMovies = await Movie.find(
    {},
    "title director releaseYear genres cast ratings"
  );

  if (allMovies === 0) {
    console.log("No movies found in database.");
    return;
  }
  console.log("----------------------------------------------");
  console.log("List of all Movies: ");
  console.log(" ");
  allMovies.forEach((movie) => {
    console.log(`Title: ${movie.title}`);
    console.log(`Director: ${movie.director}`);
    console.log(`Release Year: ${movie.releaseYear}`);
    console.log(`Genres: ${movie.genres}`);
    console.log(`Ratings:  ${movie.ratings}`);
    console.log(`Cast: ${movie.cast}`);
    console.log(`id: ${movie._id}`);
    console.log(" ");
  });
}
