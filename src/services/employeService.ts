import * as employeRepository from '../repositories/employeRepository.js'

export async function verifyEmploye(employeId: number) {
    const employeExist = await employeRepository.findById(employeId);

    return employeExist;
}