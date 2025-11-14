// Authentication utilities
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
}

// Default admin credentials (change in production!)
// Password: admin123
let defaultAdmin: AdminUser = {
  id: '1',
  username: 'admin',
  email: 'admin@axelenergy.in',
  password: '$2b$10$zqYvknFwGXkHcpFZrApIKuPdQ7mOF58d3gBv3Ke/xJwyXu9ZlCrBm', // 'admin123' hashed
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function generateToken(userId: string, username: string): string {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): { userId: string; username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function authenticateAdmin(username: string, password: string): Promise<string | null> {
  // In production, fetch from database
  // For now, use default admin
  if (username === defaultAdmin.username || username === defaultAdmin.email) {
    const isValid = await verifyPassword(password, defaultAdmin.password);
    if (isValid) {
      return generateToken(defaultAdmin.id, defaultAdmin.username);
    }
  }
  return null;
}

// Initialize default admin password on first run
export async function initializeAdmin() {
  // Already initialized with hashed password
  // In production, load from database
}

