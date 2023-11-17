<h2>REST API</h2>

<h3>DataBase</h3>

<h4>install</h4>

```sh
npm i json-server
```

<h4>Watching</h4>

```json
	"server": "json-server --watch db.json --port 4000"
```

<h3>react-query</h3>

<h4>install</h4>

```sh
npm install react-query
```

<h4>SetUp</h4>

```js
["App.jsx"];
// importing
import { QueryClient, QueryClientProvider } from "react-query";
//
const App = () => {
	const client = new QueryClient(); // creating new client
	return (
		<>
			{/*provide the client to the app*/}
			<QueryClientProvider client={client}>
				<Router />
			</QueryClientProvider>
		</>
	);
};

export default App;
```

```js
["RQSuperHeroes.jsx"];

const URL = "http://localhost:4000/superheroes";
const fetchHeroes = () => axios.get(URL); // fetching with axios
// destructure the data from the useQuery Hook
/*
useQuery accept Two params,
first: the name of the operation
second: callBack of fetching
*/
const { data, isLoading } = useQuery("query-heroes", fetchHeroes);
///
```

<h4>Error Handling</h4>

```js
// destructuring error & isError to handle the Error
const { data, isLoading, error, isError } = useQuery(
	"query-heroes",
	fetchHeroes
);
```

<h4>DevTools</h4>

<i>DevTools is used to watch the track the changes</i>

```js
["Router.jsx"];
import { ReactQueryDevtools } from "react-query/devtools";
// after </Routes>
<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />;
```

<h4> Configuration</h4>

<h5>isFetching</h5>

<i>isFetching is used to refetch the data when we mutate something in the data-base</i>

```js
const { data, isLoading, error, isError, isFetching } = useQuery(
	"query-heroes",
	fetchHeroes
);
```

<h5>cacheTime</h5>

<i>is used to do not refetch in the background in the duration passed</i>

```js
const { data, isLoading, error, isError, isFetching } = useQuery(
	"query-heroes",
	fetchHeroes,
	{ cacheTime: 5000 }
);
```

<h5>staleTime</h5>

<i>the data fetched will go from fresh stale in x millseconds passed;
</i>


Note:
<pre>
stale: 9dim
</pre>

```js
const { data, isLoading, error, isError, isFetching } = useQuery(
	"query-heroes",
	fetchHeroes,
	{ staleTime: 30000 }
);
```

<h5>refetchOnMount</h5>

<i>
accept three value:
true: default,
false: don't fetch onMount
always: fetch every mount
</i>

NOTE:

<pre>
mounting is occure when something change in the component and re-render
</pre>

```js
const { data, isLoading, error, isError, isFetching } = useQuery(
	"query-heroes",
	fetchHeroes,
	{ refetchOnMount: true }
);
```

<h5>refetchOnWIndowsFocus</h5>

<i>
If set to true, the query will refetch on window focus if the data is stale. If set to false, the query will not refetch on window focus. If set to 'always', the query will always refetch on window focus. If set to a function, the function will be executed with the latest data and query to compute the value. Defaults to true.
</i>

NOTE:

<pre>
...
</pre>

```js
const { data, isLoading, error, isError, isFetching } = useQuery(
	"query-heroes",
	fetchHeroes,
	{ refetchOnWindowFocus: true }
);
```

<h5>Polling</h5>

<h6>refetchInterval</h6>
<i>
If set to a number, the query will continuously refetch at this frequency in milliseconds. If set to a function, the function will be executed with the latest data and query to compute a frequency Defaults to false.
</i>

<h6>refetchIntervalInBackground</h6>

<i>If set to true, the query will continue to refetch while their tab/window is in the background. Defaults to false.</i>

```js
const { data, isLoading, error, isError, isFetching } = useQuery(
	"query-heroes",
	fetchHeroes,
	{
		refetchInterval: 2000,
		refetchIntervalInBackground: true,
	}
);
```

<h5>onSucces, onError</h5>

```js
const onSuccess =
const onError =
const { data, isLoading, error, isError, isFetching } = useQuery(
	"query-heroes",
	fetchHeroes,
	{
		onSuccess: (data) => console.log("The Operation Have Been Done SuccessFully.", data),
		onError: (err) => console.log("The Operation Is Failed", err)
	}
);
```

<h5>select</h5>

<i>
it takes the responded data, and returned it into a prefered data
</i>

```js
const { isLoading, isFetching, data, error, isError } = useQuery(
	"query-heroes",
	fetchHeroes,
	{
		select: (data) => {
			return data.data.map((hero) => hero.name);
		},
	}
);
// now the data is the array of heroes Names
...
<ul>
	{data.map((heroName) => {
		return <li key={heroName}> {heroName} </li>;
	})}
</ul>;
```

<h4>refetch on Event<h4>

```js
const { data, isLoading, error, isError, isFetching, refetch } = useQuery(
	"query-heroes",
	fetchHeroes,
	{
		enabled: false, // don't show the data on Mounting
	}
);

<button onClik={refetch}>fetch</button>;
```

<h4>get By Id</h4>

```jsx
["SpeId.jsx"];
const fetchHero = (heroId) => {
	return axios.get(`http://localhost:4000/superheroes/${heroId}`); // fetch the data of the id
};
const SpeHero = () => {
	const { heroId } = useParams(); // get the id from the URL

	const { data, isLoading } = useQuery(
		["super-hero", heroId],
		() => fetchHero(heroId) // pass the id to the fetching fn
	);
	return <div>{data?.data.name}</div>; // show the data
};
```

```jsx
<Route path="/rqsuperheroes/:heroId" Component={SpeHero} /> // when go to this url show this component
```

<h4>parallel queries</h4>

<i>
parallel queries is to fetch multiple data in one component
</i>

```jsx
const fetchParallel = () => {
	return axios.get("http://localhost:4000/friends");
};
const fetchHeroes = () => {
	return axios.get("http://localhost:4000/superheroes/");
};

const { data: parallelData } = useQuery("parallel-queris", fetchParallel);
const { data: heroesData } = useQuery("superhero-querie", fetchHeroes);
```

<h4>Dynamic parallel queries</h4>

<i>
DPQ is used to query multiple data in one componentn, DYNAMICALLY
</i>

```jsx
const fetchSuperHero = (heroId) => {
	return axios.get(`http://localhost:4000/superheroes/${heroId}`); // fetching the data for each hero
};
// query multiple heroes in one step
const queryResults = useQueries(
	ids.map((id) => { // get ids from props
		return {
			queryKey: ["super-hero", id], // the name of the query
			queryFn: () => fetchSuperHero(id), // quering function
		};
	})
);
```

<h4>Dependent queries</h4>

<i>
Dependent queries is to fetch a data depending on another fetched query
</i>

```jsx
import axios from "axios";
import { useQuery } from "react-query";

const fetchYoutuber = (youtuberId) => {
	return axios.get(`http://localhost:4000/youtubers/${youtuberId}`); // fetch the youtuberId passed in the props
};

const fetchCourses = (chanelId) => {
	return axios.get(`http://localhost:4000/chanels/${chanelId}`); // fetch the chanelId passed
};

const DependentQueries = ({ youtuberId }) => {
	const { data: youtuberData } = useQuery("youtuber", () =>
		fetchYoutuber(youtuberId)
	);

	const chanelId = youtuberData?.data.chanelId; // get the chanelId from the queried chanel

	const { data: chanelData } = useQuery(
		"youtuber-courses",
		() => fetchCourses(chanelId), // fetch the chanel depending on the chanelId Pa
		{
			enabled: Boolean(chanelId), // here we say that enabled option will be true if chanelId Is available
		}
	);
};
```

<h4>intialData opt</h4>

<i>
initialData opt is refers to the concept of providing initial data to a query when it 
is first executed. This is useful when you have some data that you want to display immediately,
and then you fetch additional or updated data asynchronously.
</i>

EXAMPLE:

```js
["SpeHero.jsx"];

const SpeHero = () => {
	const { heroId } = useParams();
	const clientQuery = useQueryClient(); // this wil cache the data
	const { data, isLoading } = useQuery(
		["super-hero", heroId],
		() => fetchHero(heroId),
		{
			initialData: () => {
				// fn returns the specified filtered data
				const hero = clientQuery
					.getQueryData("query-heroes") // indicated that we will get the hero from "query-heroes"
					?.data?.find((hero) => (hero.id = parseInt(heroId)));
				return hero ? { data: hero } : undefined; // if the hero exist returns data = hero
			},
		}
	);
};
```

<h4>Pagination</h4>

<i>
pagination is used to show desired number of item in the page
</i>

```js
const fetchPage = (pages) => {
	return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pages}`); // "?_limit=2" get only two elements from the list // "_page=2" get the secend page
};

const { isLoading, data } = useQuery(
	["pagination", page],
	() => fetchPage(page),
	{
		keepPreviousData: true, // this will keep showing the previous data until the current one fetched
	}
);
```

<h4>InfiniteQuery Hook</h4>

<i>the main use Case is loading more content onEvent</i>

```js
/* "pageParam" destructure it from data.pagePram */
const fetchInfinite = ({ pageParam  }) => {
	return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const {
	isLoading,
	data,
	hasNextPage, // boolean
	isFetchingNextPage /*boolean*/,
	fetchNextPage, // method onClick call it
} = useInfiniteQuery(["colors"], fetchInfinite, {
	// Hook
	getNextPageParam: (_lastPage, pages /*Response */) => {
		// this will increment the value of pageParam
		if (pages.length >= 3) return;
		return pages.length + 1;
	},
});
```

<h3>useMutation</h3>

<h4>Add To the data-base</h4>

<i>useMutation is used here to pass the data to the data-base</i>

```js
const mutateFunction = (hero) => {
	return axios.post("http://localhost:4000/superheroes", hero); // accept two prams url & data (obj)
};

const MutateHero = () => {
	const { mutate } = useMutation(mutateFunction); // accept one param fn
	mutate(heroData); // provide the obj to the mutate fn
};
```

<h4>invalide query</h4>

<h5> requery</h5>

<i>
on mutate the data refetch the query
</i>

```js
const queryClient = useQueryClient(); // get the query
const { mutate } = useMutation(mutateFunction, {
	onSuccess: () => {
		// onSuccess the mutation
		queryClient.invalidateQueries("query-heroes"); // specify the query that will be refetched
	},
});
```

<h5>pass to the cache</h5>

```js
const queryClient = useQueryClient();

const { mutate } = useMutation(mutateFunction, {
	onSuccess: (data) => {
		// specify wich query will update // get the old data
		queryClient.setQueriesData("query-heroes", (oldQueryData) => {
			///
			return {
				...oldQueryData, // spread the unchangeable data
				data: [...oldQueryData.data, data.data], // reassign to the data
			};
		});
	},
});
```

<h5>Optimistic updates</h5>

<i>
used to to do something optimisticaly
</i>

```jsx
const queryClient = useQueryClient();
const { mutate } = useMutation(mutateFunction, {
	onMutate: async (newHero) => {
		await queryClient.cancelQueries("query-heroes"); // will cancel the querying
		const previousHeroData = queryClient.getQueryData("query-heroes"); // get the queried data
		// set new data
		queryClient.setQueryData("query-heroes", (oldQueryData) => {
			return {
				oldQueryData,
				data: [
					...oldQueryData.data,
					{ ...newHero, id: oldQueryData?.data?.length },
				],
			};
		});
		///
		return {
			previousHeroData,
		};
	},
	// on error return the old data
	onError: (_error, _hero, context) => {
		return queryClient.setQueryData("query-heroes", context.previousHeroData); 
	},
	///
	onSettled: () => {
		return queryClient.invalidateQueries("query-heroes"); // refetch the data
	},
});
```
