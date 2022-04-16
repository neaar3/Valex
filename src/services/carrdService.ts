import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

import * as cardRepository from '../repositories/cardRepository.js';

export async function findByTypeAndEmployeeId(cardType: cardRepository.TransactionTypes, employeId: number) {
    const employeeHasCard = await cardRepository.findByTypeAndEmployeeId(cardType, employeId);

    return employeeHasCard;
}

export async function createNewCard(cardData: cardRepository.CardInsertData) {
    await cardRepository.insert(cardData)
}

export function createCardData(cardType: cardRepository.TransactionTypes, employeId: number, employeFullName: string) {
    const number = faker.finance.creditCardNumber('mastercard');

    const fullName = employeFullName.split(' ');
    let cardHolderName = fullName;

    if (fullName.length > 2) {
        cardHolderName = [];
        fullName.forEach((name, index) => {
            if (index !== 0 && index !== fullName.length-1) {
                if (name.length < 3) return
                name = name.slice(0,1)
            }
            cardHolderName.push(name)
        })
        cardHolderName = cardHolderName.join(' ').toUpperCase() as unknown as string[]
    }

    const securityCode = faker.finance.creditCardCVV(); 
    const securityCodeHash = bcrypt.hashSync(securityCode, 10);

    const expirationDate = dayjs().add(5, 'year').format("MM/YY");

    const randomCardData = {
        employeeId: employeId,
        number: number,
        cardholderName: cardHolderName,
        securityCode: securityCodeHash,
        expirationDate: expirationDate,
        isVirtual: false,
        isBlocked: false,
        type: cardType
    };

    return randomCardData
}