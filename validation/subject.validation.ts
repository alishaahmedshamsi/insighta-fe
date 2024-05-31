import { z } from "zod";

const subjectSchema = z.object({
    name: z.string().min(3).max(50),
    class: z.string()
});

export type Subject = z.infer<typeof subjectSchema>;

export default subjectSchema;