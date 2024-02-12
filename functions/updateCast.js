import prompt from "prompt-sync";

export async function updatedCast(selectedMovie) {
  const p = prompt();

  try {
    console.log("----------------------------------------------");
    console.log(`Selected Movie: ${selectedMovie.title}`);
    console.log(`Current Cast: ${selectedMovie.cast}`);
    console.log("----------------------------------------------");
    console.log("Options");
    console.log("1. Add new Cast member");
    console.log("2. Remove a Cast member");
    console.log("3. Update a Cast member");
    console.log("----------------------------------------------");

    const choice = p("Enter your choice: ");

    switch (choice) {
      case "1":
        const newCasts = p(
          "Enter new cast (or multiple separated with comma): "
        ).split(",");
        selectedMovie.cast.push(...newCasts);
        break;
      case "2":
        console.log("Current Cast:");
        selectedMovie.cast.forEach((cast, index) => {
          console.log(`${index + 1}. ${cast}`);
        });
        const removeCast =
          parseInt(p("Enter the index of the cast to remove: ")) - 1;
        if (
          !isNaN(removeCast) &&
          removeCast >= 0 &&
          removeCast < selectedMovie.cast.length
        ) {
          const removedCast = selectedMovie.cast[removeCast];
          selectedMovie.cast.splice(removeCast, 1);
          console.log(
            `"${removedCast}" was successully removed from ${selectedMovie.title}`
          );
        } else {
          console.log("Invalid index");
        }
        break;
      case "3":
        console.log("Current Cast:");
        selectedMovie.cast.forEach((cast, index) => {
          console.log(`${index + 1}. ${cast}`);
        });
        const editCast =
          parseInt(p("Enter the index of the cast to Update: ")) - 1;
        const updatedCast = p(`Edit ${editCast} :`);
        selectedMovie.cast[editCast] = updatedCast;

        break;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
