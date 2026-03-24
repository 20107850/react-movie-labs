import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
const MovieRecommendations = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const recommendations = data.results ? data.results.slice(0, 5) : [];

  return (
    <>
      <h3>Recommended Movies</h3>
      <ul>
        {recommendations.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

export default MovieRecommendations;