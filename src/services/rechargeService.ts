import * as rechargeRepository from '../repositories/rechargeRepository.js'

export async function insert(rechargeData: rechargeRepository.RechargeInsertData) {
    const cardRecharge = await rechargeRepository.insert(rechargeData);

    return cardRecharge;
}