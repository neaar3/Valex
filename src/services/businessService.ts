import { forbiddenError, notFoundError } from '../middlewares/handleErrorsMiddleware.js';
import { Business } from '../repositories/businessRepository.js';
import { Card } from '../repositories/cardRepository.js';
import * as purchaseService from '../services/purchaseService.js'

export async function ensureBusinessExists(businessId: number) {
    const businessResult = await purchaseService.findById(businessId);

    if (!businessResult) throw notFoundError('Business');

    return businessResult;
}

export function ensureBusinessType(cardResult: Card, businessResult: Business) {
    if (cardResult.type !== businessResult.type) throw forbiddenError('Card Type');
}