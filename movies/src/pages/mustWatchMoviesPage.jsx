import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const MustWatchMoviesPage = () => {
  const { mustWatch } = useContext(MoviesContext);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const mustWatchMovies = movies.filter((m) => mustWatch.includes(m.id));

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={mustWatchMovies}
      action={(movie) => {
        return null;
      }}
    />
  );
};

export default MustWatchMoviesPage;