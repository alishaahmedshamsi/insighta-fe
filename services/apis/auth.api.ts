import { ILoginFields, IRegisterFields } from "@/types/type";
import api from "../middleware/middleware";
import { STATUS } from "@/utils";

export const onLogin = async (data: ILoginFields) => {
  try {
    const response = await api.post('/auth/login', data);
    
    if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
      return { success: false, error: response.data.message };
    }
    
    if (response.status === STATUS.SUCCESSFUL_RESPONSE) {
      return { success: true, response: response.data };
    }
  } catch (error) {
    console.error(error); 
    return { success: false, error: (error as any).response.data.message };
  }
}

export const onRegister = async (data: IRegisterFields) => {
    try {
        const response = await api.post('/auth/register', data);

        if (response.status === STATUS.UNPROCESSABLE_ENTITY) {
        return { success: false, error: response.data.message };
        }
        
        if (response.status === STATUS.SUCCESSFUL_CREATED) {
        return { success: true, response: response.data };
        }
    } catch (error) {
        console.error(error); 
        return { success: false, error: (error as any).response.data.message };
    }
}