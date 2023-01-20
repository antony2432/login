import jwt from "jsonwebtoken";
import { serialize } from "cookie"

export default function loginHandler(req, res) {
  const { email, password } = req.body

  try {
    if (email === 'user@dominio.com' && password === 'admin') {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email: 'antony@conectica.com',
        username: 'antony Chuquival',
        role: 'admin',
        name: 'Antony',
        apellido: 'Chuquival'
      }, 'secret',)

      const serialized = serialize('myTokenName', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/'
      })
      console.log(serialized)
      res.setHeader('Set-Cookie', serialized)
      console.log('login success')
      return res.json('login success', { token })
    }
  } catch (error) {
    console.log(error)
  }

  res.status(401).json({ error: 'Invalid credentials' })
}