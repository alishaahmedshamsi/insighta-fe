import { IPoints, ISendMessage, ITakeQuiz, IUploadAssignment } from "@/types/type";
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
}
export const fetchPoints = async (): Promise<IPoints> => {
    try {
      const response = await api.get("/user/fetch/points");
  
      if (response.status === STATUS.UNPROCESSABLE_ENTITY || response.status === STATUS.BAD_REQUEST) {
        throw new Error(response.data.message);
      }
  
      return response.data.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message ?? error.message);
    }
  };



  
export const onUploadAssignment = async (data: IUploadAssignment) => {
	try {
	
		const response = await api.post("/teacher/assignment", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

		console.log("api data: ", data);
		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}
		if (response.status === STATUS.BAD_REQUEST) {
			return { success: false, response: response.data.message };
		}

		if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
			return { success: false, response: response.data.message };
		}

		console.log("api data: ", data);
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