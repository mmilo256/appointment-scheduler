import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  host: 'mail.municipalidadchonchi.cl',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
})

// Función para enviar correo
export const sendMail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL, // tu email
    to,
    subject,
    text,
    html
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error)
      }
      resolve(info)
    })
  })
}
