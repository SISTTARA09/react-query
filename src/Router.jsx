import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./components/Home.page";
import SuperHeroes from "./components/SuperHeroes.page";
import RQSuperHeroes from "./components/RQSuperHeroes.page";
import NavBar from "./components/NavBar";
import SpeHero from "./components/SpeHero";
import ParallelQueries from "./components/ParallelQueries";
import DependentQueries from "./components/dependentQueries";
import Pagination from "./components/Pagination";
import InfiniteQuery from "./components/InfiniteQuery";
const Router = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route index element={<Home />} />
				<Route path="/superheroes" Component={SuperHeroes} />
				<Route path="/rqsuperheroes" Component={RQSuperHeroes} />
				<Route path="/rqsuperheroes/:heroId" Component={SpeHero} />
				<Route path="/parallelqueries" Component={ParallelQueries} />
				<Route path="/pagination" Component={Pagination} />
				<Route path="/infinitequery" Component={InfiniteQuery} />
				<Route
					path="/dependent"
					element={<DependentQueries youtuberId={"omar@gmail.com"} />}
				/>
			</Routes>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</BrowserRouter>
	);
};

export default Router;
