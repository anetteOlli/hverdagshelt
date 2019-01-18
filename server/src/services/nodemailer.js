// @flow
// https://codeburst.io/implementing-nodemailer-5-min-de2d2c781d6b
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport(
    {
        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user:'mapokengaming@gmail.com',
            pass:'Laol1996!'
        }
    }
);

class MailController {
    /***
     * Method for sending an activation link to an given email with a specific activation link
     * @param newUser userInformation
     * @param callback
     */
    sendSingleMail(dataPackage: object, callback: function) {

        let mailOptions = {
          from: "NOREPLY@hverdagshelt.com",
          to: dataPackage.email,
          subject: "Your problem has been registered",
          text: dataPackage.text,
          html: dataPackage.html
        };

        transporter.sendMail(mailOptions,function(email_err){
            if(!email_err){
                console.log("Email is Sent");
                callback({success: true, token: token})
            }else{
                callback(email_err);
                console.log(email_err);
            }
        });
    }


    /***
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

    /***
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
