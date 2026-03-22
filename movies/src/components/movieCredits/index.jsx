import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

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
    <>
      <h3>Cast</h3>
      <ul>
        {cast.map((person) => (
          <li key={person.credit_id}>
            {person.name} as {person.character}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCredits;