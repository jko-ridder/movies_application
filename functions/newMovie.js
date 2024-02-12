import prompt from "prompt-sync";

export async function addNewMovie(Movie) {
  console.log("Add the data for the new movie: ");
  const p = prompt();

  const title = p("Enter Movietitle: ");
  const director = p("Enter directors name: ");
  const releaseYear = parseInt(p("Enter release year: "));
  const genres = p("insert genres(seperate with comma): ").split(",");
  const ratings = p("insert your rating (1-5 and seperate with comma): ")
    .split(",")
    .map(parseFloat);
  const cast = p("Insert cast(seperate with comma): ").split(",");

  try {
    const addedMovie = new Movie({
      title,
      director,
      releaseYear,
      genres,
      ratings,
      cast,
    });
    await addedMovie.save();
    console.log("----------------------------------------------");
    console.log(`${title} added!`);
  } catch (error) {
    console.error("Error adding new movie: ", error);
  }
}
