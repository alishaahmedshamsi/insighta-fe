import { ILoginFields, IRegisterFields, IUserUpdate } from "@/types/type";
import api from "../middleware/middleware";
import { STATUS } from "@/utils";
import Cookies from "js-cookie";

export const onLogin = async (data: ILoginFields) => {
	try {
		const response = await api.post("/auth/login", data);

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, error: response.data.message };
		}

		if (response.status === STATUS.UNAUTHORIZED) {
			return { success: false, error: response.data.message };
		}

		console.log("response from auth login: ", response);
		return { success: true, response: response };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			response: (error as any).response.data.message,
		};
	}
};

export const onRegister = async (data: IRegisterFields) => {
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

export const fetchCurrentUser = async () => {
	try {
		const response = await api.get("/auth/current-user");
		return response.data.data;
	} catch (error: any) {
		return error?.response?.data?.message ?? error.message.data;
	}
};

export const logout = async () => {
	try {
		const response = await api.post("/auth/logout");
		localStorage.removeItem("accessToken");
		Cookies.remove("accessToken");
	} catch (error: any) {
		throw new Error(error?.response?.data?.message ?? error.message.data);
	}
};

export const forgetPasswordApi = async (data: string) => {
	try {
		const response = await api.put("/auth/forget", { email: data });

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data };
		}

		return { success: true, response: response };
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			response: (error as any).response.data.message,
		};
	}
};

export const verfyOtp = async (data: any) => {
	try {
		const response = await api.put("/auth/verify", data);
		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}
		if (response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}
		localStorage.setItem("accessToken", response.data.data);
		return { success: true, response: response.data };
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			response: (error as any).response.data.message,
		};
	}
};

export const resetPassword = async (data: any) => {
	try {
		const response = await api.put("/auth/reset", {
			password: data.newPassword,
		});
		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}
		if (response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}
		localStorage.removeItem("accessToken");
		Cookies.remove("accessToken");
		return { success: true, response: response.data };
	} catch (error: any) {
		console.log(error);
		return {
			success: false,
			response: (error as any).response.data.message,
		};
	}
};
