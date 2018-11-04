import {nodemailer} from 'nodemailer';
import {htmlToText} from 'html-to-text';

export const sendEmail = options =>
  new Promise((resolve, reject) => {
    const transpoter = nodemailer.createTransport({
      host: "gmail",
      port: 25,
      auth: {
        user: "domlee2012@gmail.com",
        pass: "Camry4560",
      },
    });

    const text = htmlToText.fromString(options.html, {
        wordwrap: 150,
      });
      const mailOptions = {
        from: 'domlee2012@gmail.com',
        to: options.email,
        subject: options.subject,
        html: options.html
      };

      transpoter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        return resolve({message : "Reset email has been sent to your inbox"  });
      });
    });
