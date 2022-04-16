import * as authRepository from '../repositories/authRepository.js'

export async function verifyApiKey(apiKey: string){
    const keyExist = await authRepository.verifyApiKey(apiKey);

    return keyExist;
}