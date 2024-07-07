import {
	IPoints,
	ISendMessage,
	ITakeQuiz,
	IUploadAssignment,
} from "@/types/type";
import api from "../middleware/middleware";
import { STATUS } from "@/utils";

export const updateUser = async (data: any) => {
	try {
		const response = await api.put("/user/", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}
		if (response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}

		return { success: true, response: response.data };
	} catch (error: any) {
		return {
			success: false,
			response: error?.response?.data?.message ?? error.message.data,
		};
	}
};
export const fetchPoints = async (): Promise<IPoints> => {
	try {
		const response = await api.get("/user/fetch/points");

		if (
			response.status === STATUS.UNPROCESSABLE_ENTITY ||
			response.status === STATUS.BAD_REQUEST
		) {
			throw new Error(response.data.message);
		}

		return response.data.data;
	} catch (error: any) {
		throw new Error(error?.response?.data?.message ?? error.message);
	}
};

export const onUploadAssignment = async (data: IUploadAssignment) => {
	try {
		const response = await api.post("/submission/", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}
		if (response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}

		return { success: true, response: response.data };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			response: (error as any).response.data.message,
		};
	}
};

export const onTakeQuiz = async (data: ITakeQuiz) => {
	try {
		const response = await api.post("/submission/", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}
		if (response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}

		// console.log("response.data: ", response.data);
		return { success: true, response: response.data };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			response: (error as any).response.data.message,
		};
	}
};

export const onSendMessage = async (data: ISendMessage) => {
	try {
		const response = await api.post("/message", data);

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}
		if (response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}

		// console.log("response.data: ", response.data);
		return { success: true, response: response.data };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			response: (error as any).response.data.message,
		};
	}
};

export const getMessages = async (id?: string) => {
	try {
		const response = await api.get(`/message/${id ? id : undefined}`);

		// console.log("data from api: ", response)
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};

export const getAssignments = async (id?: string) => {
	try {
		const response = await api.get(
			`/student/get-student-assignment?subject/${id ? id : undefined}`
		);

		// console.log("data from api: ", response)
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};

export const fetchStudentSubjects = async () => {
	try {
		const response = await api.get(`/user/subjects/users`);

		// console.log("student subject data from api: ", response);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};

export const fetchStudentLectures = async (id?: string) => {
	try {
		const response = await api.get(
			`/student/student-lecture/get?subject=${id ? id : undefined}`
		);
		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}
		if (response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}

		console.log("fetchLectures API: ", response);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};

export const fetchStudentAssignments = async (id?: string) => {
	try {
		const response = await api.get(
			`/student/student-assignment?subject=${id ? id : undefined}`
		);

		// console.log("data from api: ", response);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};

export const fetchStudentQuiz = async (id?: string) => {
	try {
		const response = await api.get(
			`/student/student-quiz?subject=${id ? id : undefined}`
		);

		// console.log("data from api: ", response);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};
export const fetchStudentQuizSubmission = async (id?: string) => {
	try {
		const response = await api.get(
			`/submission?subject=${id ? id : undefined}&isQuiz=true`
		);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};

export const fetchStatus = async (index: string) => {
	try {
		const { data } = await api.get(
			`/submission/status?assignmentId=${index}`
		);

		return data.data;
	} catch (error: any) {
		console.log(error);
	}
};

// export const fetchQuizStatus = async (index: string) => {
// 	try {
// 		const { data } = await api.get(`/status/quiz?quizId=${index}`);

// 		console.log("data from quiz status: ", data)
// 		return data.data;
// 	} catch (error: any) {
// 		console.log(error);
// 	}
// };

export const fetchQuizStatus = async (index: string) => {
	try {
		const { data } = await api.get(
			`/submission/status/quiz?quizId=${index}`
		);
		console.log("data from quiz status: ", data);
		return data.data;
	} catch (error: any) {
		console.error(
			"Error fetching quiz status:",
			error.response?.data || error.message
		);
		throw new Error("Failed to fetch quiz status");
	}
};

export const fetchSubmission = async (id?: string, subject?: string) => {
	try {
		const { data } = await api.get(
			`/submission/?isQuiz=false&id=${id}&subject=${subject}`
		);
		return data.data;
	} catch (error: any) {
		console.log(error);
	}
};

export const fetchQuizSubmission = async (id?: string, subject?: string) => {
	try {
		const { data } = await api.get(
			`/submission/?isQuiz=true&id=${id}&subject=${subject}`
		);
		return data.data;
	} catch (error: any) {
		console.log(error);
	}
};

export const gradeSubmission = async (
	grade: number | undefined,
	id: string
) => {
	try {
		const { data } = await api.put(`/submission/${id}`, { grade });
		return data.data;
	} catch (error: any) {
		console.log(error);
	}
};

export const submitReview = async (text: string, teacherId: string) => {
	try {
		const { data } = await api.post(`/student/review/`, {
			text,
			teacherId,
		});
		return { success: true, response: data.data };
	} catch (error: any) {
		console.log(error);
		return { success: false, response: error.response.data.message };
	}
};
