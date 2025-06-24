import {hash,genSalt,compare} from 'bcrypt'

export const hashPassword = async (password) => {
    const salt = await genSalt(10);
    return hash(password, salt);
}

export const comparePassword = async (plainPassword,hashedPassword) => {
    console.log('Comparing passwords',plainPassword,hashedPassword);
    return compare(plainPassword,hashedPassword);
}
