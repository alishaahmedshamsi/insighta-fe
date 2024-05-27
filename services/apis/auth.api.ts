import { ILoginFields, IRegisterFields } from "@/types/type";
import api from "../middleware/middleware";
import { STATUS } from "@/utils";

export const onLogin = async (data: ILoginFields) => {
	try {
		const response = await api.post("/auth/login", data);

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, error: response.data.message };
		}

		if (response.status === STATUS.UNAUTHORIZED) {
			return { success: false, error: response.data.message };
		}

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

export const fetchCurrentUser = async () =>{
	try {
		const response = await api.get('/auth/current-user')
		return response.data.data
	} catch (error:any) {
		return error?.response?.data?.message ?? error.message.data
	}
}

export const logout = async () =>{
	try {
		const response = await api.post('/auth/logout')
		console.log(response);
		
	} catch (error:any) {
			throw new Error(error?.response?.data?.message ?? error.message.data)
	}	
}

export const updateUser = async () =>{
	try {
		const response = await api.put('/user/')
		if(response.status === STATUS.UNPROCESSABLE_ENTITY){
			return {success: false, error: response.data.message}
		}
		if(response.status === STATUS.BAD_REQUEST){
			return {success: false, error: response.data.message}
		}
	
		return {success: true, response: response.data}
	} catch (error:any) {
		return {success: false, response: error?.response?.data?.message ?? error.message.data}
	}
}