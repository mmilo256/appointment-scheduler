import { sendMail } from '../../config/mailer.js'

export const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body

  try {
    const info = await sendMail(to, subject, text, html)
    res.status(200).json({ message: 'Email enviado con éxito', info })
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el email', error })
  }
}
