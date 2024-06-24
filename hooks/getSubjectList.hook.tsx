import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "@/services/apis/school.api";
import { useCurrentUser } from "@/hooks/user.hook";

// Define the custom hook
export const useSubjectsList = () => {
	const { user } = useCurrentUser();

	let classId = user?.classes[0]._id;
	console.log("classId: ", classId);

	const { data, isLoading } = useQuery({
		queryKey: ["fetch-subjects-list", classId], // Add classId to the queryKey
		queryFn: () => fetchSubjects(classId),
		enabled: !!classId, // Only enable the query if classId is truthy
	});
	console.log("data in hook: ", data);

	return { data, isLoading };
};
