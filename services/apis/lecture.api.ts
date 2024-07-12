import api from "../middleware/middleware";

export const UpdateUserLecturePoints = async () => {
    try {
        const response = await api.put(`/student/lecture/points/`);
        return { success: true, response: response.data.data };
    } catch (error: any) {
        return { success: false, response: (error as any).response.data.message, };
    }
};