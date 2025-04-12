import { randomInt } from "crypto"

export function generateOtp(): string{
    return randomInt(100000, 999999).toString()
}