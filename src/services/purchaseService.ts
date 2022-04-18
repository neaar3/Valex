import bcrypt from 'bcrypt';
import * as businessesRepository from '../repositories/businessRepository.js'
import * as paymentRepository from '../repositories/paymentRepository.js'
import { Card } from '../repositories/cardRepository.js';

export async function findById(businessesId: number) {
    const businessResult = await businessesRepository.findById(businessesId);

    return businessResult;
}

export function verifyPassword(cardResult: Card, password: string) {
    const passwordIsValid = bcrypt.compareSync(password, cardResult.password);

    return passwordIsValid;
}

export async function insert(paymentData: paymentRepository.PaymentInsertData) {
    await paymentRepository.insert(paymentData);
}
