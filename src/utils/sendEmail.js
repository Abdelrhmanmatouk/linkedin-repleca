import nodemailer from 'nodemailer';

export async function sendEmail({to,subject,html}){
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
          user: process.env.Email,
          pass: process.env.pass,
        },
      });
      
     
      const info = await transporter.sendMail({
        from: `"APP 👻" <${process.env.Email}>`, 
        to , 
        subject , 
        html,
      });
      if(info.accepted.length>0)return true
      return false
}

