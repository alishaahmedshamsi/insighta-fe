import api from "../middleware/middleware";
import { STATUS } from "@/utils";

export const createAnnouncement = async (data: any) => {
    try {
        const response = await api.post("/announcement", data);

        if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
            return { success: false, response: response.data.message };
        }

        if (response.status === STATUS.UNAUTHORIZED) {
            return { success: false, response: response.data.message };
        }

        return { success: true, response: response };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            response: (error as any).response.data.message,
        };
    }
}

export const fetchAnnouncements = async (query:any) => {
    try {
        const response = await api.get(`/announcement?createdBy=${query}`);
        console.log(response);
        
        return response.data.data;
    } catch (error) {
        console.error(error);
        return {
            success: false,
            response: (error as any).response.data.message,
        };
    }
}