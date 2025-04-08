const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const movies = [
  {
    id: 1,
    title: "American Psycho",
    year: 2000,
    director: "Mary Harron",
    genre: "Horror/Mystery",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzBjM2I5ZjUtNmIzNy00OGNkLWIwZDMtOTAwYWUwMzA2YjdlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 2,
    title: "Dallas Buyers Club",
    year: 2013,
    director: "Jean-Marc Vallée",
    genre: "Drama/History",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTYwMTA4MzgyNF5BMl5BanBnXkFtZTgwMjEyMjE0MDE@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 3,
    title: "God of Gamblers",
    year: 1989,
    director: "Jing Wong",
    genre: "Action/Comedy",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYTg4Y2I1MmItYzgxOC00M2I2LTk0MTEtODQxMzAwMTM5YWFjXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 4,
    title: "Mickey 17",
    year: 2025,
    director: "Bong Joon Ho",
    genre: "Sci-Fi",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZGQwYmEzMzktYzBmMy00NmVmLTkyYTUtOTYyZjliZDNhZGVkXkEyXkFqcGc@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
  },
  {
    id: 5,
    title: "Top Gun:Maverick",
    year: 2022,
    director: "Joseph Kosinski",
    genre: "Action",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 6,
    title: "War Dogs",
    year: 2016,
    director: "Todd Phillips",
    genre: "Crime/Drama",
    poster:
      "https://m.media-amazon.com/images/I/51w6+m3bFuL._AC_UF894,1000_QL80_.jpg",
  },
];

let reviews = [
  {
    id: 1,
    movieId: 4,
    author: "RobertPattinsonSimper9999",
    rating: 5,
    comment: "I love Robbert Pattinson",
    date: "2025-04-04",
  },
  {
    id: 2,
    movieId: 6,
    author: "Walter White With Black Hair",
    rating: 3,
    comment: "I also wanna be a gun runner but I still wanna cook meth",
    date: "2025-04-02",
  },
  {
    id: 3,
    movieId: 3,
    author: "ShanKoeMee King",
    rating: 1,
    comment: "I can play better than this dumbass in real life.",
    date: "2025-03-08",
  },
  {
    id: 4,
    movieId: 5,
    author: "Kyaw G 969",
    rating: 5,
    comment: "Tom Cruise, The GOAT!!!.",
    date: "2025-03-10",
  },
  {
    id: 5,
    movieId: 2,
    author: "HIV-Positive",
    rating: 5,
    comment: "I'm still alive because of this guy. Thank You So Much!.",
    date: "2025-03-22",
  },
  {
    id: 6,
    movieId: 1,
    author: "RealHomeLander69",
    rating: 1,
    comment:
      "Call be dumb but I didn't understand what happened in this movie.",
    date: "2025-03-31",
  },
  {
    id: 7,
    movieId: 4,
    author: "P'Diddy",
    rating: 5,
    comment:
      "Give me that human printing machine.So that I can clone myself and do my oil business",
    date: "2025-04-08",
  },
];

const findMovieById = (id) => movies.find((movie) => movie.id === parseInt(id));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Reviews Hub",
    movies,
  });
});

app.get("/review/:movieId", (req, res) => {
  const movie = findMovieById(req.params.movieId);
  if (!movie) {
    return res.status(404).send("Movie not found");
  }
  res.render("review", {
    title: `Review ${movie.title}`,
    movie,
  });
});

app.post("/submit-review", (req, res) => {
  const { movieId, author, rating, comment } = req.body;

  if (!movieId || !author || !rating || !comment) {
    return res.status(400).send("All fields are required");
  }

  const movie = findMovieById(movieId);
  if (!movie) {
    return res.status(404).send("Movie not found");
  }

  const newReview = {
    id: reviews.length + 1,
    movieId: parseInt(movieId),
    author,
    rating: parseInt(rating),
    comment,
    date: new Date().toISOString().split("T")[0],
  };

  reviews.push(newReview);
  res.redirect(`/reviews?movieId=${movieId}`);
});

app.get("/reviews", (req, res) => {
  const movieId = req.query.movieId;
  let filteredReviews = reviews;
  let movie = null;

  if (movieId) {
    filteredReviews = reviews.filter(
      (review) => review.movieId === parseInt(movieId)
    );
    movie = findMovieById(movieId);
  }

  res.render("reviews", {
    title: movie ? `Reviews for ${movie.title}` : "All Reviews",
    reviews: filteredReviews,
    movies,
    selectedMovieId: movieId ? parseInt(movieId) : null,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
