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

module.exports = class MailController {
    
    sendActivationLink(notification) {
        const mailOptions = {
            from: 'test-email@gmail.com',
            to: `${notification.email}`,
            subject: 'AKTIVERINGS LINK FOR Hverdagshelt brukerkonto',
            html: `<h2>mye svada om hva man skal gjøre osv så kommer message</h2> <p>${notification.message}</p>`
        };
        transporter.sendMail(mailOptions, (err,res) => this.callbackHandler(err,res));
    }
    
    sendMassMail(notification,recepients) {
        
        recepients.map((val) => {
            let mailOptions = {
                from:'mapokengaming@gmail.com',
                to:`${val}`,
                subject: "YEETED MY WAY DOWN TOWN",
                html: `<h2>mye svada om hva man skal gjøre osv så kommer message</h2> <p>${notification.message}</p>`
            };
            transporter.sendMail(mailOptions, (err,res) => this.callbackHandler(err,res));
        });
    }
    
    callbackHandler(err,res){
        if (err) {
            console.error('there was an error: ', err);
        } else {
            console.log('here is the res: ', res)
        }
    }
};


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