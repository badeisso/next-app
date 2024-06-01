import { runQurey } from "@/dbController/dbHandler"

export async function createSession(userId, roleId) {
    try {
        const qurey = 'insert into users_sessions (role_id, user_id, expires_at) values (?, ?, ?);'
        const currentDate = Math.ceil(new Date().getTime() / 1000);
        const sessionExpiryDate = currentDate + (30 * 24 * 60 * 60);
        const binds = [Number(roleId), Number(userId), String(sessionExpiryDate)];
        const result = runQurey(qurey, binds);
        return result;
    }
    catch (err) {
        throw Error(err)
    }
}