import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const MovieCredits = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const cast = data.cast ? data.cast.slice(0, 5) : [];

return (
  <Accordion sx={{ marginTop: 2 }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6">Cast</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <List>
        {cast.map((person) => (
          <ListItem key={person.credit_id || person.cast_id} disablePadding>
            <ListItemText primary={`${person.name} as ${person.character}`} />
          </ListItem>
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);
};

export default MovieCredits;