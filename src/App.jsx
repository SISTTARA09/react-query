import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";
const App = () => {
	const client = new QueryClient();
	return (
		<>
			<QueryClientProvider client={client}>
				<Router />
			</QueryClientProvider>
		</>
	);
};

export default App;
