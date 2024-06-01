import { runQurey } from "@/dbController/dbHandler";

export async function getUserById(id) {
    try {
        const qurey = `select username, created_at, email, id from users where id = ?;`;
        const binds = [id];
        const result = runQurey(qurey, binds)
        return result;
    }
    catch (err) {
        throw Error(err)
    }
}

export async function getUsers() {
    try {
        const qurey = `select username, created_at, email, id from users;`;
        const result = runQurey(qurey, [])
        return result;
    }
    catch (err) {
        throw Error(err)
    }
}

export async function addUser(username, email, password) {
    try {
        const qurey = 'insert into users (username, password, email) values (?, ?, ?);';
        const binds = [username, password, email];
        const result = runQurey(qurey, binds);
        return result;
    }
    catch (err) {
        throw Error(err);
    }
}

export async function getUserByEmail(email) {
    try {
        const qurey = 'select id, username, password from users where email = ?;';
        const binds = [email];
        const result = runQurey(qurey, binds);
        return result;
    }
    catch (err) {
        throw Error(err);
    }
}