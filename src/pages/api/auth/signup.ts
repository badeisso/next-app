import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod";
import { addUser } from '@/controller/users';
import { encryptPassword } from '@/app/utils/encryptPassword';

const schema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),

});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST")
            return res.status(405).json({ message: "Method not allowed" });
        const response = typeof req.body === 'string' ? schema.safeParse(JSON.parse(req.body)) : schema.safeParse(req.body);
        if (!response.success) {
            const { errors } = response.error;
            return res.status(400).json({
                error: {
                    message: "invalid request", errors,
                }
            })
        }
        const userId = await addUser(response.data.username, response.data.email, encryptPassword(response.data.password));
        return res.status(200).json({
            message: "success",
            data: {
                "userId": String(userId.insertId)
            }
        });
    }
    catch (err: any) {
        if (err.includes("Duplicate entry"))
            return res.status(400).json({
                message: "Email exist already"
            })
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}