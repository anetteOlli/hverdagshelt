// https://codeburst.io/implementing-nodemailer-5-min-de2d2c781d6b
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'mapokengaming@gmail.com',
    pass: 'Laol1996!'
  }
});

class MailController {
  /***
   * Method for sending an activation link to an given email with a specific activation link
   * @param notification JSON with email and activationLink
   */
  sendActivationLink(newUser, callback) {
    var info = {};
    info.user = newUser;
    info.expiry = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var token = nodemailer.encode(info, 'yeet');
    console.log('http://localhost:3000/verifyEmail/' + token);

    var mailOptions = {
      from: 'TEST<noreply@vysly.com>',
      to: newUser.email,
      subject: 'Welcome to TEST',
      text: 'Visit this http://localhost:3000/verifyEmail/' + token,
      html: '<a href="http://localhost:3000/verifyEmail/' + token + '"><H2>Click on this</H2></a>'
    };
    nodemailer.sendMail(mailOptions, function(email_err) {
      if (email_err) {
        callback(email_err);
        console.log(email_err);
      } else {
        console.log('Email is Sent');
        callback({ success: true });
      }
    });
  }

  /***
   * Method for sending bulk of emails to specific groups of recepients
   * @param notification  A string message that is sent out to the users/recepients
   * @param recepients An array of recepients that is iterated and sent an mail
   */
  sendMassMail(notification, recepients) {
    recepients.map(val => {
      let mailOptions = {
        from: 'mapokengaming@gmail.com',
        to: `${val}`,
        subject: 'YEETED MY WAY DOWN TOWN',
        html: `<h2>mye svada om hva man skal gjøre osv så kommer message</h2> <p>${notification.message}</p>`
      };
      transporter.sendMail(mailOptions, (err, res) => this.callbackHandler(err, res));
    });
  }

  /***
   * Simple callbackHandler for sendMail function
   * @param err Error message if the mail wasn't sent
   * @param res The response status of the action
   */
  callbackHandler(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res);
    }
  }
}

module.exports = new MailController();

//EXAMPLE USAGE
/*
//import MailController from './services/nodemailer'; Kun import i andre filer

let mailController = new MailController();
//Skal brukes i kontrolleren, når en bruker blir laget så blir denne her sendt. Når den linken blir klikket
// kjøres det mot serveren og aktiverer kontoen, starter i slått av modus.

//App brukt kun for demo
app.use('/send', (req,res) => {
    let notification = {
        email:'larssoerlie96@gmail.com',
        message:'YEEEEEEEEEEEEEEEET'
    };
    console.log(notification);
    mailController.sendActivationLink(notification);
});

*/
