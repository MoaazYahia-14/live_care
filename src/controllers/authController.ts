import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'
import User from '../models/User'

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  })
}

// @desc    Admin Login
// @route   POST /api/auth/admin/login
// @access  Public
export const authAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body

  try {
    const admin = await Admin.findOne({ username })

    if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        role: 'admin',
        token: generateToken(admin._id.toString(), 'admin'),
      })
    } else {
      res.status(401).json({ error: 'بيانات الدخول غير صحيحة' })
    }
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' })
  }
}

// @desc    User Register
// @route   POST /api/auth/user/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() })

    if (userExists) {
      res.status(400).json({ error: 'البريد الإلكتروني مستخدم بالفعل' })
      return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString(), 'user'),
      })
    } else {
      res.status(400).json({ error: 'بيانات مستخدم غير صالحة' })
    }
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' })
  }
}

// @desc    User Login
// @route   POST /api/auth/user/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email: email.toLowerCase() })

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString(), 'user'),
      })
    } else {
      res.status(401).json({ error: 'بيانات الدخول غير صحيحة' })
    }
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' })
  }
}
