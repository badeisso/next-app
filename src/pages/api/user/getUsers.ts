import type { NextApiRequest, NextApiResponse } from 'next'
import { getUsers } from '@/controller/users';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET")
            return res.status(405).json({ message: "Method not allowed" });
        const result = await getUsers();
        return res.status(200).json({
            message: "success",
            data: result
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}