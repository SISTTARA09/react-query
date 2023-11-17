import axios from "axios";
import { useQuery } from "react-query";

const fetchYoutuber = (youtuberId) => {
	return axios.get(`http://localhost:4000/youtubers/${youtuberId}`);
};
const fetchCourses = (chanelId) => {
	return axios.get(`http://localhost:4000/chanels/${chanelId}`);
};
const DependentQueries = ({ youtuberId }) => {
	const { data: youtuberData } = useQuery("youtuber", () =>
		fetchYoutuber(youtuberId)
	);
	const chanelId = youtuberData?.data.chanelId;
	const { data: chanelData } = useQuery(
		"youtuber-courses",
		() => fetchCourses(chanelId),
		{
			enabled: Boolean(chanelId),
		}
	);

	return <div>dependentQueries</div>;
};

export default DependentQueries;
