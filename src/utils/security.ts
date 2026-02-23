import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

/**
 * Hashes a plaintext string (password or OTP) securely
 */
export const hashData = async (data: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(data, salt);
};

/**
 * Compares a plaintext string against a securely hashed string
 */
export const verifyData = async (plainText: string, hashedData: string): Promise<boolean> => {
    return bcrypt.compare(plainText, hashedData);
};

/**
 * Generates a signed JWT token for the user
 */
export const generateToken = (payload: object, expiresIn: string | number = '30d'): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing JWT_SECRET in environment variables");
    }
    return jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
};
