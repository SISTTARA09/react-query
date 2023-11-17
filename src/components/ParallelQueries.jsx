import axios from "axios";
import { useQuery } from "react-query";


const fetchParallel = () => {
  return axios.get('http://localhost:4000/friends')
}
const fetchHeroes = () => {
  return axios.get('http://localhost:4000/superheroes/')
}


const ParallelQueries = () => {

  const {data: parallelData}= useQuery('parallel-queris', fetchParallel)
  const {data: heroesData}= useQuery('superhero-querie', fetchHeroes)



	return <div>ParallelQueries</div>;
};

export default ParallelQueries;
