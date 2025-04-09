import nodemailer from 'nodemailer'
import { EMAIL, EMAIL_PASS } from './config.js'

const transporter = nodemailer.createTransport({
  host: 'mail.municipalidadchonchi.cl',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS
  }
})

// Función para enviar correo
export const sendMail = (to, subject, text, html) => {
  const mailOptions = {
    from: EMAIL, // tu email
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
