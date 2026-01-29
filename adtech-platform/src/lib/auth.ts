import { sign, verify } from 'jsonwebtoken'
import { hash } from 'bcryptjs'
import { db } from './db'
import type { User, UserRole } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'adtech-platform-secret-key-2024'
const TOKEN_EXPIRY = '7d'

export interface JWTPayload {
  userId: string
  email: string
  role?: UserRole
  iat?: number
  exp?: number
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

// Hash password (for future use with real database)
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

// Generate JWT token
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

// Login user
export async function loginUser(email: string, _password: string): Promise<AuthResponse> {
  const user = db.getUserByEmail(email)

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  // For demo purposes, allow any password
  // In production, you would verify the password against a hashed version

  const token = generateToken({ userId: user.id, email: user.email })

  return {
    success: true,
    user,
    token,
  }
}

// Register user
export async function registerUser(
  email: string,
  _password: string,
  name: string,
  _company?: string
): Promise<AuthResponse> {
  const existingUser = db.getUserByEmail(email)

  if (existingUser) {
    return { success: false, error: 'User already exists' }
  }

  const newUser = db.createUser({
    email,
    name,
    role: 'publisher', // Default role
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
  })

  const token = generateToken({ userId: newUser.id, email: newUser.email })

  return {
    success: true,
    user: newUser,
    token,
  }
}

// Get user from token
export function getUserFromToken(token: string): User | null {
  const payload = verifyToken(token)

  if (!payload) return null

  const user = db.getUserById(payload.userId)

  if (!user) return null

  return user
}

// Extract token from Authorization header
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader) return null

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null

  return parts[1]
}
