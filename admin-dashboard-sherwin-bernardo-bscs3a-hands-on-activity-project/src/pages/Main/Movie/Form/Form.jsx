import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";
import { Outlet } from "react-router-dom";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  let { movieId } = useParams();
  const navigate = useNavigate();

  const url = movieId ? `/movies/${movieId}` : "/movies";
  const method = movieId ? "patch" : "post";

  useEffect(() => {
    if (query !== "") {
      axios({
        method: "get",
        url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzkwM2QxZmU2MmFlN2QyNjJiNmNjYTQ4M2Y5M2U3MiIsIm5iZiI6MTcyOTc1NzE5NC41NTcsInN1YiI6IjY3MWEwMDBhNWQwZGU4OTA0MmQ4ZGU5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FVVdB2MiqYiPT9zF-DgtzgujwBnAPijbptO9gF3ExSc",
        },
      })
        .then((response) => {
          setSearchedMovieList(response.data.results);

          setTotalPages(Math.min(response.data.total_pages, 20));
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  }, [query, page]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (selectedMovie === undefined) {
      alert("Please search and select a movie.");
    } else {
      const data = {
        tmdbId: selectedMovie.id,
        title: selectedMovie.original_title,
        overview: selectedMovie.overview,
        popularity: selectedMovie.popularity,
        releaseDate: selectedMovie.release_date,
        voteAverage: selectedMovie.vote_average,
        backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
        isFeatured: 0,
      };

      const request = axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : `/movies`,
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((saveResponse) => {
          console.log(saveResponse);
          alert("Success");
          navigate("/main/movies");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
        console.log(response.data);
      });
    }
  }, [movieId]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <div className="div-title-page">
        <h1 className="title-page">
          {movieId !== undefined ? "Edit " : "Create "} Movies
        </h1>
      </div>
      {movieId === undefined && (
        <>
          <div className="form-search-container">
            <div className="form-search-container-btn">
              <input
                className="input-search"
                placeholder="Search movie"
                type="text"
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1); 
                }}
              />
              <button type="button" onClick={() => setPage(1)}>
                <b>Search</b>
              </button>
            </div>
            {searchedMovieList.length > 0 && (
              <>
                <div className="form-searched-movie">
                  {searchedMovieList.map((movie) => (
                    <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                      {movie.original_title}
                    </p>
                  ))}
                </div>
                <div className="form-pagination">
                  <button disabled={page === 1} onClick={handlePreviousPage}>
                    <b>Previous</b>
                  </button>
                  <span>
                    <b>
                      Page {page} of {totalPages}
                    </b>
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                  >
                    <b>Next</b>
                  </button>
                </div>
              </>
            )}
          </div>
          <hr />
        </>
      )}

      <div className="form-container">
        <form>
          {selectedMovie ? (
            <img
              className="form-poster-image"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            />
          ) : (
            ""
          )}
          <div className="form-field">
            <b>Title:</b>
            <input
              type="text"
              value={selectedMovie ? selectedMovie.original_title : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  original_title: e.target.value,
                })
              }
            />
          </div>
          <div className="form-field">
            <b>Overview:</b>
            <textarea
              rows={10}
              value={selectedMovie ? selectedMovie.overview : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  overview: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <b>Popularity:</b>
            <input
              type="text"
              value={selectedMovie ? selectedMovie.popularity : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  popularity: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <b>Release Date:</b>
            <input
              type="text"
              value={selectedMovie ? selectedMovie.release_date : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  release_date: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <b>Vote Average:</b>
            <input
              type="text"
              value={selectedMovie ? selectedMovie.vote_average : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  vote_average: e.target.value,
                })
              }
            />
          </div>

          <button className="form-button" type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
      {movieId !== undefined && selectedMovie && (
        <div>
          <hr />
          <nav>
            <ul className="tabs">
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/cast-and-crews`);
                }}
              >
                Cast & Crews
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/videos`);
                }}
              >
                Videos
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/photos`);
                }}
              >
                Photos
              </li>
            </ul>
          </nav>

          <Outlet />
        </div>
      )}
    </>
  );
};

export default Form;
