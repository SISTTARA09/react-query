import axios from "axios";
import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

const fetchInfinite = ({ pageParam }) => {
	return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQuery = () => {
	const {
		isLoading,
		data,
		hasNextPage, // boolean
		isFetchingNextPage /*boolean*/,
		fetchNextPage, // method onClick call it
	} = useInfiniteQuery(["colors"], fetchInfinite, {
		getNextPageParam: (_lastPage, pages /*Response */ ) => {
			// this will increment the value of pageParam
			if (pages.length >= 3) return;
			return pages.length + 1;
		},
	});

	return (
		<div>
			<ul>
				{data?.pages.map((group, i) => {
					return (
						<Fragment key={i}>
							{group.data.map((col) => {
								return <li key={col.id}> {col.label} </li>;
							})}
						</Fragment>
					);
				})}
			</ul>
			<button onClick={fetchNextPage} disabled={!hasNextPage}>
				more
			</button>
		</div>
	);
};

export default InfiniteQuery;
