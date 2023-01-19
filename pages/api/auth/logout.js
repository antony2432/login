import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
export default function logoutHandler(req, res) {
  const { myTokenName } = req.cookies
  if (!myTokenName) {
    return res.status(401).json({ error: 'no token' })
  }

  try {
    verify(myTokenName, 'secret')
    const serialized = serialize('myTokenName', null, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', // none para cuando te comunicas con un backend externo
      maxAge: 0,
      path: '/'
    })
    res.setHeader('Set-Cookie', serialized)
    res.status(200).json({ message: 'logout success' })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}