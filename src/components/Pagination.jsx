import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchPage = (pages) => {
	return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pages}`);
};

const Pagination = () => {
	const [page, setPage] = useState(1);
  const { isLoading, data } = useQuery(["pagination", page], () => fetchPage(page),
    {
    keepPreviousData: true
  });
	console.log(page);
	return (
		<div>
        {isLoading ? "Loading..." : data ? <ul>
          {data.data.map(col => {
            return <li key={col.id}> {col.label} </li>
          })}
        </ul>: ''}
			<button
				onClick={() => {
					setPage((p) => p - 1);
				}}
				disabled={page === 1}
			>
				prev
			</button>
			<button
				onClick={() => {
					setPage((p) => p + 1);
				}}
				disabled={page === 2}
			>
				next
			</button>
		</div>
	);
};

export default Pagination;
