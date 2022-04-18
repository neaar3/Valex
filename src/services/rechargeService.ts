import * as rechargeRepository from '../repositories/rechargeRepository.js'

export async function insert(rechargeData: rechargeRepository.RechargeInsertData) {
    await rechargeRepository.insert(rechargeData);
}