import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod";
import { serialize } from "cookie";
import { decryptPassword, encryptPassword } from '@/app/utils/encryption';
import { getUserByEmail } from '@/controller/users';
import { createSession } from '@/controller/sessions';
const jwt = require('jsonwebtoken');
const fs = require("fs");
const schema = z.object({
    email: z.string(),
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
        const [{ id, username, password }] = await getUserByEmail(response.data.email);
        if (decryptPassword(password) !== response.data.password)
            return res.status(401).json({
                message: "Unauthorized"
            });
        const privateKey = fs.readFileSync('privateKey.key');
        const sessionId = await createSession(id, 1);
        const encryptedSessionId = encryptPassword(String(sessionId.insertId));
        const jwtToken = jwt.sign(
            {
                "username": username, "sessionId": encryptedSessionId
            },
            privateKey,
            { algorithm: 'RS256' });
        const cookie = serialize('session', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        });
        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({
            message: "success",
            data: encryptedSessionId
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}