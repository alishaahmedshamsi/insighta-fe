import { fetchCurrentUser } from "@/services/apis";
import { fetchStudentAssignments, fetchStudentSubjects } from "@/services/apis/user.api";
import { IUser } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

// Define the custom hook
export const useCurrentUser = () => {
	const {
		data: user,
		isLoading,
		isError,
		error,
	} = useQuery<IUser, Error>({
		queryKey: ["current-user"],
		queryFn: fetchCurrentUser,
	});

	console.log("user: ", user);

	return { user, isLoading, isError, error };
};

export const useStudentSubject = () => {
	const {
		data: subjectsList,
		isLoading,
		// isError,
		error,
	} = useQuery({
		queryKey: ["fetch-student-subjects-list"],
		queryFn: fetchStudentSubjects,
	});

	// console.log("user: ", user)

	return { subjectsList, isLoading, error };
};


export const useStudentAssignments = (subject: string) => {
  const {
		data: assignmentsList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["fetch-student-assignments-list"],
		queryFn: () => fetchStudentAssignments(subject),
	});

	// console.log("user: ", user)

	return { assignmentsList, isLoading, error };
};

