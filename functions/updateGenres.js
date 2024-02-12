import prompt  from "prompt-sync";

export async function updateGenres(selectedMovie) {
    const p = prompt();

    try {
        console.log("----------------------------------------------");
        console.log(`Selected movie: ${selectedMovie.title}`);
        console.log(`Current genres: ${selectedMovie.genres}`);
        console.log("----------------------------------------------");
        console.log("Options:");
        console.log("1. Add a new genre");
        console.log("2. Remove a genre");
        console.log("3. Update a genre");
        console.log("----------------------------------------------");

        const choice = p("Enter your choice: ");

        switch (choice) {
            case "1":
                const newGenres = p("Enter new Genre(or multiple separated with comma): ").split(",");
                selectedMovie.genres.push(...newGenres);
                break;
            case "2":
                console.log("Current Genres:");
                selectedMovie.genres.forEach((genre, index) => {
                console.log(`${index + 1}. ${genre}`);        
                    });
                    const removeGenre = parseInt(p("Enter the index of the genre to remove: ")) -1;
                    if (!isNaN(removeGenre) && removeGenre >= 0 && removeGenre < selectedMovie.genres.length) {
                        const removedGenre = selectedMovie.genres[removeGenre];
                        selectedMovie.genres.splice(removeGenre, 1);
                        console.log(`${removedGenre} was removed successfully from ${selectedMovie.title}`);
                    } else {
                        console.log("Invalid index.");
                    }
                break;
            case "3": 
                console.log("Current genres:");
                selectedMovie.genres.forEach((genre, index) => {
                    console.log(`${index + 1}. ${genre}`);
                });
                const editGenre = parseInt(p("Enter the index of the genre to Update: ")) -1;
                const updatedGenre = p(`Edit ${editGenre} :`);
                selectedMovie.genres[editGenre] = updatedGenre;
                break;
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }
