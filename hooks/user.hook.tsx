import { fetchCurrentUser } from "@/services/apis";
import {
	fetchQuizSubmission,
	fetchStudentAssignments,
	fetchStudentSubjects,
	fetchSubmission,
} from "@/services/apis/user.api";
import api from "@/services/middleware/middleware";
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

export const useStudentSubmission = (
	assignmentId?: string,
	subject?: string
) => {
	const {
		data: submissionList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["fetch-student-submission-list", assignmentId, subject],
		queryFn: () => fetchSubmission(assignmentId, subject),
	});

	// console.log("user: ", user)

	return { submissionList, isLoading, error };
};

export const useStudentQuizSubmission = (quizId?: string, subject?: string) => {
	const {
		data: quizSubmissionList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["fetch-student-quiz-submission-list", quizId, subject],
		queryFn: () => fetchQuizSubmission(quizId, subject),
	});

	// console.log("user: ", user)

	return { quizSubmissionList, isLoading, error };
};

export const useStudentReviewStatus = (teacherId: string) => {
	const { data: reviewStatus } = useQuery({
		queryKey: ["class-teachers"],
		queryFn: async () => {
			const { data: status } = await api.get(
				`review?teacherId=${teacherId}`
			);
			return status.data.data;
		},
	});
};
