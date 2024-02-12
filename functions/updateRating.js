import prompt from "prompt-sync";

export async function updatedRating(selectedMovie) {
  const p = prompt();

  try {
    console.log("----------------------------------------------");
    console.log(`Selected Movie: ${selectedMovie.title}`);
    console.log(`Current ratings: ${selectedMovie.ratings}`);
    console.log("----------------------------------------------");
    console.log("Options");
    console.log("1. Add new rating");
    console.log("2. Remove a rating");
    console.log("3. Update a rating");
    console.log("----------------------------------------------");

    const choice = p("Enter your choice: ");

    switch (choice) {
      case "1":
        const newRatings = p(
          "Enter new rating (or multiple separated with comma): "
        ).split(",");
        selectedMovie.ratings.push(...newRatings);
        break;
      case "2":
        console.log("Current Ratings:");
        selectedMovie.ratings.forEach((rating, index) => {
          console.log(`${index + 1}. Rating: ${rating}`);
        });
        const removeRating =
          parseInt(p("Enter the index of the rating to remove: ")) - 1;
        if (
          !isNaN(removeRating) &&
          removeRating >= 0 &&
          removeRating < selectedMovie.ratings.length
        ) {
          const removedRating = selectedMovie.ratings[removeRating];
          selectedMovie.ratings.splice(removeRating, 1);
          console.log(
            `The rating of  "${removedRating}" was successully removed from ${selectedMovie.title}`
          );
        } else {
          console.log("Invalid index");
        }
        break;
      case "3":
        console.log("Current Ratings:");
        selectedMovie.ratings.forEach((rating, index) => {
          console.log(`${index + 1}. Rating: ${rating}`);
        });
        const editRating =
          parseInt(p("Enter the index of the rating to Update: ")) - 1;
        const updatedRating = p(`Edit ${editRating} :`);
        selectedMovie.rating[editRating] = updatedRating;
        break;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
