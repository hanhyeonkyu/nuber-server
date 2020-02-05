import Mailgun from "mailgun-js"

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILFUN_API_KEY || '',
    domain: 'sandbox95294007b606486d8554e3b3fff878ed.mailgun.org'
})

const sendEmail = (subject: string, html: string) => {
    const emailData = {
        from: "aiji.alexhan@gmail.com",
        to: "aiji.alexhan@gmail.com",
        subject,
        html
    }
    return mailGunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`
    const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`
    return sendEmail(emailSubject, emailBody)
}