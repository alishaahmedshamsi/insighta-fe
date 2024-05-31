import api from "../middleware/middleware";
import { STATUS } from "@/utils";

export const createClass = async (className: number) => {
	try {
		const response = await api.post("/school/class-create", { className });
		if (
			response.status === STATUS.UNPROCESSABLE_ENTITY ||
			response.status === STATUS.BAD_REQUEST
		) {
			return { success: false, response: response.data.message };
		}
		return { success: true, response: response.data };
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			response: error.response?.data?.message || "An error occurred",
		};
	}
};

export const fetchClasses = async () => {
	try {
		const response = await api.get("/school/get-classes");
		console.log(response.data.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};

export const fetchUsers = async ({
	role,
	search,
	page,
}: {
	role: string;
	search: string;
	page: number;
}) => {
	try {
		const response = await api.get(
			`/school/fetch/users?limit=8&role=${role}&search=${search}&page=${
				page ? page : 1
			}`
		);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
};

export const fetchSchoolsInfo = async () => {
	try {
		const response = await api.get("/admin/school");
		return response.data.data;
	} catch (error: any) {
		throw new Error(error ?? error.message.data);
	}
}

export const  createSubject = async (data: any) => {
	try {
		const response = await api.post("/school/subject-create", data);
		if (response.status === STATUS.UNPROCESSABLE_ENTITY || response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}
		return { success: true, response: response.data };
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			response: error.response?.data?.message || "An error occurred",
		};
	}
}