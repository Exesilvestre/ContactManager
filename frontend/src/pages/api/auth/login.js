import { signIn } from './auth'
 
export default async function handler(req, res) {
  try {
    const { username, password } = req.body
    await signIn('credentials', { email, username })
 
    res.status(200).json({ success: true })
  } catch (error) {
    if (error.type === 'CredentialsSignin') {
      res.status(401).json({ error: 'Invalid credentials.' })
    } else {
      res.status(500).json({ error: 'Something went wrong.' })
    }
  }
}