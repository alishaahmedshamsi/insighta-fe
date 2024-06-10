import { IAddAssignment, IAddLecture, IAddQuiz, ILoginFields, IRegisterFields, IUserUpdate } from "@/types/type";
import api from "../middleware/middleware";
import { STATUS } from "@/utils";



export const onAddAssignment = async (data: FormData) => {
	try {
		const response = await api.post("/teacher/assignment", data, {
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

export const onAddQuiz = async (data: IAddQuiz) => {
	try {
		const response = await api.post("/teacher/quiz", data);

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

export const onAddLecture = async (data: IAddLecture) => {
	try {
		const response = await api.post("/teacher/lecture", data);


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

export const fetchAssignments = async (subject?:string) => {
	try {
		const response = await api.get(`/teacher/assignment?subject=${subject?subject:undefined}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
}

export const fetchQuiz = async (classroom?:string) => {
	try {
		const response = await api.get(`/teacher/quiz?classroom=${classroom?classroom:undefined}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
}
export const fetchLectures = async (classroom?:string) => {
	try {
		const response = await api.get(`/teacher/lecture?class=${classroom?classroom:undefined}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
}