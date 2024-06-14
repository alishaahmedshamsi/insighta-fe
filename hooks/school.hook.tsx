import { useQuery } from "@tanstack/react-query";
import { ISchoolInfo } from "@/types/type";
import { fetchSchoolsInfo } from "@/services/apis/school.api";
// Define the custom hook
export const useSchoolInfo = () => {
	const { data: schoolData } = useQuery({
		queryKey: ["fetch-schools"],
		queryFn: () => fetchSchoolsInfo(),
	});

	// console.log("schoolData: ", schoolData);

	return { schoolData };
};
