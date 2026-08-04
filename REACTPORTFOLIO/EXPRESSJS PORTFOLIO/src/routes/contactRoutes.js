const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Nom, email et message sont requis' })
  }

  const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background: #f4f4f4; font-family: 'Segoe UI', Arial, sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #00362e 0%, #004d40 100%); padding: 40px 32px; text-align: center; }
    .header h1 { color: #e8a020; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 32px; }
    .field { margin-bottom: 24px; }
    .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #8a8a8a; margin-bottom: 6px; }
    .field-value { font-size: 15px; color: #1a1a1a; line-height: 1.6; padding: 12px 16px; background: #f8f9fa; border-radius: 8px; border-left: 3px solid #e8a020; }
    .message-box { background: #f8f9fa; border-radius: 12px; padding: 20px; border: 1px solid #eee; }
    .message-box p { margin: 0; font-size: 15px; color: #333; line-height: 1.8; white-space: pre-wrap; }
    .footer { background: #f8f9fa; padding: 20px 32px; text-align: center; border-top: 1px solid #eee; }
    .footer p { margin: 0; font-size: 12px; color: #8a8a8a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouveau message portfolio</h1>
      <p>Un visiteur vous a contacté via votre portfolio</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Expéditeur</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${email}" style="color: #e8a020; text-decoration: none;">${email}</a></div>
      </div>
      ${subject ? `<div class="field"><div class="field-label">Sujet</div><div class="field-value">${subject}</div></div>` : ''}
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box"><p>${message}</p></div>
      </div>
    </div>
    <div class="footer">
      <p>Envoyé depuis le portfolio de Mouhamed Sall</p>
    </div>
  </div>
</body>
</html>`

  const mailOptions = {
    from: `"Portfolio - ${name}" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: subject || `Nouveau message de ${name} via votre portfolio`,
    html: htmlTemplate
  }

  try {
    await transporter.sendMail(mailOptions)
    res.json({ message: 'Message envoyé avec succès' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ message: "Erreur lors de l'envoi du message" })
  }
})

module.exports = router
