import { redisClient } from "./redisServer";

export const setCache = async <T>(
    key: string,
    value: T,
    expire?: number
) => {
    await redisClient.set(
        key,
        JSON.stringify(value),
        expire ? { EX: expire } : {}
    );
};

export const getCache = async <T>(key: string): Promise<T | null> => {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

export const deleteKeyCashe = async <T>(key : string): Promise <void> =>{
    const data = await redisClient.DEL(key);
    console.log("deleted data", data);
}