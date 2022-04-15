import * as authRepository from '../repositories/authRepository.js'

export async function verifyApiKey(apiKey){
    const keyExist: number = await authRepository.verifyApiKey(apiKey);

    return keyExist;
}