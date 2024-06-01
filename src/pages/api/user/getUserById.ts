import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserById } from '@/controller/users';
import { z } from "zod"

const schema = z.object({
    id: z.number(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET")
            return res.status(405).json({ message: "Method not allowed" });
        const response = schema.safeParse(req.body);
        if (!response.success) {
            const { errors } = response.error
            return res.status(400).json({
                error: {
                    message: "invalid request", errors,
                }
            })
        }
        const result = await getUserById(response.data.id);
        return res.status(200).json({
            message: "success",
            data: result[0]
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}