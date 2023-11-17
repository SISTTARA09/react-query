import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			{[
				["Home", "/"],
				["SuperHeroes", "/superheroes"],
				["RQSuperHeroes", "/rqsuperheroes"],
				["parallelQueries", "/parallelQueries"],
				["dependent", "/dependent"],
			].map(([page, url], i) => {
				return (
					<NavLink key={i} style={{ padding: "1rem" }} to={url}>
						{page}
					</NavLink>
				);
			})}
		</nav>
	);
};

export default NavBar;
