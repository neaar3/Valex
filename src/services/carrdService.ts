import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

import * as cardRepository from '../repositories/cardRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';

export async function findByCardDetails(cardNumber: string, cardHolderName: string, expirationDate: string) {
    const card = await cardRepository.findByCardDetails(cardNumber, cardHolderName, expirationDate);

    return card;
}

export async function findById(id: number) {
    const card = await cardRepository.findById(id);

    return card;
}

export async function findByTypeAndEmployeeId(cardType: cardRepository.TransactionTypes, employeeId: number) {
    const employeeHasCard = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);

    return employeeHasCard;
}

export async function createNewCard(cardData: cardRepository.CardInsertData) {
    const securityCodeHash = bcrypt.hashSync(cardData.securityCode, 10);
    cardData.securityCode = securityCodeHash;
    const cardId = await cardRepository.insert(cardData);

    return cardId;
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

    const expirationDate = dayjs().add(5, 'year').format("MM/YY");

    const randomCardData = {
        employeeId: employeId,
        number: number,
        cardholderName: cardHolderName,
        securityCode: securityCode,
        expirationDate: expirationDate,
        isVirtual: false,
        isBlocked: false,
        type: cardType
    };

    return randomCardData
}

export function verifyExpirationDate(cardResult: cardRepository.Card) {
    dayjs.extend(customParseFormat);
    
    const now = dayjs();
    const expirationDate = dayjs(cardResult.expirationDate, 'MM/YY')
    const diff = expirationDate.diff(now, 'month');

    return diff;
}

export function verifySecurityCode(cardResult: cardRepository.Card, securityCode: string) {
    const securityCodeIsValid = bcrypt.compareSync(securityCode, cardResult.securityCode);

    return securityCodeIsValid;
}

export async function updateCard(cardId: number, password: string) {
    const passwordHash = bcrypt.hashSync(password, 10);

    const updatedCardData = {
        id: cardId,
        password: passwordHash
    } as cardRepository.CardUpdateData;

    await cardRepository.update(cardId, updatedCardData);
}

export async function visualizeRecharges(cardId: number) {
    const cardRecharges = await rechargeRepository.findByCardId(cardId);

    return cardRecharges;
}

export async function visualizeTransactions(cardId: number) {
    const cardTransactions = await paymentRepository.findByCardId(cardId);

    return cardTransactions;
}