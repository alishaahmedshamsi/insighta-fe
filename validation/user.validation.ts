import {z} from 'zod'

export const userUpdateSchema = z.object({
	fullname: z.string().nonempty(),
	// profilePicture: z.string().nonempty(),
	location:z.string().nonempty()
  });