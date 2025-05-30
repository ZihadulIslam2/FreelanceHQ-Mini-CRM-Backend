import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: any
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }

  const token = authHeader.split(' ')[1] // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token missing' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Auth Middleware Error:', error)
    return res.status(401).json({ message: 'Invalid token' })
  }
}
