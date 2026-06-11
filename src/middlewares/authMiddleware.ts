import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: any
}

export const protectAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

      if (decoded.role !== 'admin') {
         res.status(403).json({ error: 'غير مصرح للوصول لهذه الصلاحيات' })
         return
      }

      req.user = decoded
      next()
    } catch (error) {
      res.status(401).json({ error: 'غير مصرح، التوكن غير صالح' })
    }
  }

  if (!token) {
    res.status(401).json({ error: 'غير مصرح، لا يوجد توكن' })
  }
}
