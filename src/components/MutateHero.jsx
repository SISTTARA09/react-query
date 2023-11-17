import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const mutateFunction = (hero) => {
	return axios.post("http://localhost:4000/superheroes", hero);
};

const MutateHero = () => {
	const queryClient = useQueryClient();
	const { mutate } = useMutation(mutateFunction, {
		onMutate: async (newHero) => {
			await queryClient.cancelQueries("query-heroes"); // will cancel the querying
			const previousHeroData = queryClient.getQueryData("query-heroes"); // get the queried data
			queryClient.setQueryData("query-heroes", (oldQueryData) => {
				// set new data
				return {
					oldQueryData,
					data: [
						...oldQueryData.data,
						{ ...newHero, id: oldQueryData?.data?.length },
					],
				};
			});
			return {
				previousHeroData,
			};
		},
		onError: (_error, _hero, context) => {
			return queryClient.setQueryData("query-heroes", context.previousHeroData);
		},
		onSettled: () => {
			queryClient.invalidateQueries("query-heroes");
		},
	});

	function handleSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const heroData = Object.fromEntries(formData);
		heroData.id = Date.now();
		mutate(heroData);
		return;
	}
	return (
		<form onSubmit={handleSubmit}>
			<input type="text" name="name" />
			<input type="text" name="alterEgo" />
			<button type="submit">add Hero</button>
		</form>
	);
};

export default MutateHero;
