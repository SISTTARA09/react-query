import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const fetchHero = (heroId) => {
	return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const SpeHero = () => {
	const { heroId } = useParams();
	const clientQuery = useQueryClient();
	const { data, isLoading } = useQuery(
		["super-hero", heroId],
		() => fetchHero(heroId),
		{
			initialData: () => {
				const hero = clientQuery
					.getQueryData("query-heroes")
					?.data?.find((hero) => (hero.id = parseInt(heroId)));
				return hero ? { data: hero } : undefined;
			},
		}
	);
	return <div>{isLoading ? <h4>Loading...</h4> : data?.data.alterEgo}</div>;
};

export default SpeHero;
