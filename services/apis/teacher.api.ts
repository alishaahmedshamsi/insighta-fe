import { IAddAssignment, IAddLecture, IAddQuiz, ILoginFields, IRegisterFields, IUserUpdate } from "@/types/type";
import api from "../middleware/middleware";
import { STATUS } from "@/utils";
import Cookies from "js-cookie";



export const onAddAssignment = async (data: IAddAssignment) => {
	try {
		const response = await api.post("/auth/register", data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});

		console.log("data: ", data);

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
		const response = await api.post("/auth/register", data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});

		console.log("data: ", data);

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
		const response = await api.post("/auth/register", data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});

		console.log("data: ", data);

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