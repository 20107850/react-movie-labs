import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const HomePage = (props) => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover", page],
    queryFn: getMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />

      <Stack spacing={2} sx={{ alignItems: "center", paddingBottom: 4 }}>
        <Pagination
          count={data.total_pages > 20 ? 20 : data.total_pages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </>
  );
};

export default HomePage;