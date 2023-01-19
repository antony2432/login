import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function loginHandler (req, res) {
  const { email, password } = req.body
  console.log(req.body)

  if (email === 'antony@conectica.com' && password === 'admin') {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      email: 'antony@conectica.com',
      username: 'antony Chuquival'
    }, 'secret')

    const serialized = serialize('myTokenName', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      sameSite: 'none', // none para cuando te comunicas con un backend externo
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    })

    res.setHeader('Set-Cookie', serialized)

    return res.json('login success', { token })
  }

  res.status(401).json({ error: 'Invalid credentials' })
}
