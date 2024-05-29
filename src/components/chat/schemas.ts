import { z } from "zod"
const schema = z.string().url()

const schemaHistory = z.object({
    status: z.string(),
    history: z.array(z.object({
        role: z.string(),
        parts: z.array(z.object({
            text: z.string()
        }))
    }))
})

const schemaPromptResponse = z.object({
    status: z.string(),
    response: z.string()
})

export { schema, schemaHistory, schemaPromptResponse }