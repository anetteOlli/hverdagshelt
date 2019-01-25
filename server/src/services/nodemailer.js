// @flow
// https://codeburst.io/implementing-nodemailer-5-min-de2d2c781d6b
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport(
  {
    host:'smtp.gmail.com',
    service: 'gmail',
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
      user:'mapokengaming@gmail.com',
      pass:'Laol1996!'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
class MailController {
    /**
     * Method for sending an activation link to an given email with a specific activation link
     * @param newUser userInformation
     * @param callback
     */
    sendSingleMail(dataPackage: object, callback: function) {
        console.log('---Inne i sendSingleMail');
        console.log('---DataPackage er:', dataPackage);
        console.log('---Email er:', dataPackage.recepients);
        let mailOptions = {
          from: "NOREPLY@hverdagshelt.com",
          to: dataPackage.recepients,
          subject: dataPackage.subject,
          text: dataPackage.text,
          html: dataPackage.html
        };

        transporter.sendMail(mailOptions, email_err => {
            if(!email_err){
                console.log("Email is Sent");
                callback(200);
            }else{
                callback(500);
                console.log(email_err);
            }
        });
    }


    /**
     * Method for sending bulk of emails to specific groups of recepients
     * @param notification  A string message that is sent out to the users/recepients
     * @param recepients An array of recepients that is iterated and sent an mail
     */
    sendMassMail(dataPackage: object) {
        dataPackage.recepients.map((val) => {
          let mailOptions = {
            from: "NOREPLY@hverdagshelt.com",
            to: val.email,
            subject: "Your problem has been registered",
            text: dataPackage.text,
            html: dataPackage.html
          };
            transporter.sendMail(mailOptions, (err,res) => this.callbackHandler(err,res));
        });
    }

    /**
     * Simple callbackHandler for sendMail function
     * @param err Error message if the mail wasn't sent
     * @param res The response status of the action
     */
    callbackHandler(err,res){
        if (err) {
            console.error('there was an error: ', err);
        } else {
            console.log('here is the res: ', res)
        }
    }
};

module.exports = new MailController();
