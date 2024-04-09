const nodeMailer = require('nodemailer');
class MailService {
  constructor() {
    this.trasporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: false,
    });
  }
  async sendActivationMail(email, link) {
    await this.trasporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html: `
      <div className="">
        <h1>Активация аккаунта</h1>
        <p>Для активации перейдите по ссылке: 
          <a href="${link}">${link}</a>
        </p>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
