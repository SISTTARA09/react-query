import axios from "axios";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import MutateHero from "./MutateHero";
const fetchHeroes = () => axios.get("http://localhost:4000/superheroes");

const RQSuperHeroes = () => {
	const { data, isLoading, error, isError, refetch } = useQuery(
		"query-heroes",
		fetchHeroes,
		{
		cacheTime: 1000,
		}
	);
	return (
			<>
			<h2>HeroesList with React-Query</h2>
			{isError ? (
				<h4> {error} </h4>
			) : isLoading ? (
				<h4>Loading...</h4>
			) : data ? (
				<ul>
					{data.data.map((hero,i) => {
						return (
							<NavLink
								style={{ display: "block" }}
								to={`/rqsuperheroes/${hero.id}`}
								key={i}
							>
								{hero.name}
							</NavLink>
						);
					})}
				</ul>
			) : (
				""
			)}
			<button onClick={refetch}>refetch</button>
			<MutateHero  />
		</>
	);
};

export default RQSuperHeroes;
