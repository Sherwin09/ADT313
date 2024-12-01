import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieCards from "../../../../components/MovieCards/MovieCards";
import { useMovieContext } from "../../../../context/MovieContext";

const Home = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [filter, setFilter] = useState(""); // For filtering
  const [sortOption, setSortOption] = useState("title"); // Default sorting by title
  const { movieList, setMovieList, setMovie } = useMovieContext();

  // Fetch movies
  const getMovies = () => {
    axios
      .get("/movies")
      .then((response) => {
        setMovieList(response.data);
        const random = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[random]);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (movieList.length) {
      const interval = setInterval(() => {
        const random = Math.floor(Math.random() * movieList.length);
        setFeaturedMovie(movieList[random]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [movieList]);

  const filteredAndSortedMovies = movieList
    .filter((movie) => movie.title.toLowerCase().includes(filter.toLowerCase())) 
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title); 
      }
      if (sortOption === "release_date") {
        return new Date(b.releaseDate) - new Date(a.releaseDate); 
      }
      if (sortOption === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="main-container">
      {featuredMovie && movieList.length ? (
        <div className="featured-list-container">
          <div
            className="featured-backdrop"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.9)),
                url(${
                  featuredMovie.backdropPath !==
                  "https://image.tmdb.org/t/p/original/undefined"
                    ? featuredMovie.backdropPath
                    : featuredMovie.posterPath || "/default/image/path.jpg"
                })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <span className="featured-movie-title">{featuredMovie.title}</span>
          </div>
        </div>
      ) : (
        <div className="featured-list-container-loader"></div>
      )}

      <div className="movies-container">
        <div className="Header-movies">
          <h1 className="movies_h1">Movies</h1>
          <div className="filters-container">
            <input
              type="text"
              placeholder="Search by title..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-input"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-dropdown"
            >
              <option className="Options" value="title">
                Sort by Title
              </option>
              <option className="Options" value="release_date">
                Sort by Release Date
              </option>
              <option className="Options" value="rating">
                Sort by Rating
              </option>
            </select>
          </div>
        </div>
        <div className="list-container">
          {filteredAndSortedMovies.map((movie) => (
            <MovieCards
              key={movie.id}
              movie={movie}
              onClick={() => {
                navigate(`/view/${movie.id}`);
                setMovie(movie);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
