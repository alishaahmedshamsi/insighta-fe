import api from "../middleware/middleware";
import { STATUS } from "@/utils";

export const createClass = async (classes:number) =>{
    try {
        const response = await api.post('/school/class-create',{className:classes});
        
        if(response.status === STATUS.UNPROCESSABLE_ENTITY){
            return {success:false,response:response.data.message}
        }
        if(response.status === STATUS.BAD_REQUEST){
            return {success:false,response:response.data.message}
        }
        
            return {success:true,response:response.data}
     
    } catch (error:any) {
        console.log(error);
        return {success:false, response:error.response.data.message}
    }
}


export const fetchClasses = async () =>{
    try {
        const response = await api.get('/school/get-classes')
        return response.data.data
    } catch (error:any) {
        throw new Error(error ?? error.message.data)
    }
}


export const fetchUsers = async ({role,search,page}:{role:string,search:string,page:number}) =>{
    try {
        const response = await api.get(`/school/fetch/users?limit=8&role=${role}&search=${search}&page=${page?page:1}`)
        return response.data.data
    } catch (error:any) {
        throw new Error(error ?? error.message.data)
    }
}