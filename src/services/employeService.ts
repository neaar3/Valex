import { notFoundError } from '../middlewares/handleErrorsMiddleware.js';
import * as employeeRepository from '../repositories/employeeRepository.js'

// export async function verifyEmploye(employeeId: number) {
//     const employeExist = await employeeRepository.findById(employeeId);

//     return employeExist;
// }

export async function ensureEmployeeExists(employeeId: number) {
    const employeeExist = await employeeRepository.findById(employeeId);

    if (!employeeExist) throw notFoundError('Employee');

    return employeeExist;
}