import * as crypto from "crypto";
import { getProperties } from "../services/PropertyService";
const salt = "1234";

export function hash (passwd: string): string {
    var hash = crypto.createHmac('sha512', getProperties().auth.salt); /** Hashing algorithm sha512 */
    hash.update(passwd);
    return hash.digest('hex');
}

export function name(passwd:string,hashed:string) {
    return (hash(passwd) === hashed)
}

