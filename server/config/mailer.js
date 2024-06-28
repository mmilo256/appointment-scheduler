import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emiliosotoandrade256@gmail.com',
    pass: 'hyya iyhs jesb iqvq'
  }
})

// Función para enviar correo
export const sendMail = (to, subject, text, html) => {
  const mailOptions = {
    from: 'emiliosotoandrade256@gmail.com', // tu email
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
