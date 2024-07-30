import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
})

const sendOtp2FA = (email: string, otp: number) => {
  let mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: email,
    subject: "Two-Factor Authentication Code",
    html: `
        <html>
        <head>
          <style>
            .container {
              font-family: Arial, sans-serif;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 10px;
              max-width: 600px;
              margin: auto;
              text-align: center;
            }
            .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Two-Factor Authentication Code</h2>
            <p>Dear User,</p>
            <p>To complete your login process, please use the following One-Time Password (OTP) code:</p>
            <div class="otp-code">${otp}</div>
            <p>Please note that this code is valid for only 5 minutes.</p>
            <p>If you did not request this code, please ignore this email or contact support.</p>
            <div class="footer">
              <p>Thank you,</p>
              <p>Team <b>Adhyen<b></p>
            </div>
          </div>
        </body>
        </html>
      `,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}

//forgot password
const sendForgotPasswordOtp = (email: string, otp: number) => {
  let mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    html: `
        <html>
        <head>
          <style>
            .container {
              font-family: Arial, sans-serif;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 10px;
              max-width: 600px;
              margin: auto;
              text-align: center;
            }
            .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Password Reset OTP</h2>
            <p>Dear User,</p>
            <p>To reset your password, please use the following One-Time Password (OTP) code:</p>
            <div class="otp-code">${otp}</div>
            <p>Please note that this code is valid for only 5 minutes.</p>
            <p>If you did not request this code, please ignore this email or contact support.</p>
            <div class="footer">
              <p>Thank you,</p>
              <p>Team <b>Adhyen<b></p>
            </div>
          </div>
        </body>
        </html>
      `,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}

export { sendOtp2FA, sendForgotPasswordOtp }
