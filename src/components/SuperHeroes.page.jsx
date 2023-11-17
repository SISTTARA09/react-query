import axios from "axios";
import { useEffect, useState } from "react";

const SuperHeroes = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [error, setError] = useState('')
	useEffect(() => {
		axios
			.get("http://localhost:4000/superheroes")
			.then((data) => {
				setData(data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.message)
				setIsLoading(false);
			});
	}, []);
	return (
		<>
			<h2>HeroesList</h2>
			{isLoading ? (
				<h4>Loading...</h4>
			) : data ? (
				<ul>
					{data.map((hero) => {
						return <li key={hero.id}> {hero.name} </li>;
					})}
				</ul>
			) : <h4> {error} </h4>}
		</>
	);
};

export default SuperHeroes;
