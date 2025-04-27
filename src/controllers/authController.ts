import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../../prisma/client'

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    res.status(201).json({ token })
  } catch (error) {
    console.error('Signup Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    res.json({ success: true,user, token })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
