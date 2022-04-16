import * as employeeRepository from '../repositories/employeeRepository.js'

export async function verifyEmploye(employeeId: number) {
    const employeExist = await employeeRepository.findById(employeeId);

    return employeExist;
}