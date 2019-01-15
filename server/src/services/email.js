import { genTokenEmail } from './util';


var mailOptions = {
  from : "TEST<noreply@vysly.com>",
  to : newUser.email,
  subject : "Welcome to TEST",
  text : 'Visit this http://localhost:3001/verifyEmail/'+token,
  html : '<a href="http://localhost:3001/yeet/verifyEmail/'+token+'"><H2>Click on this</H2></a>'
};




class email {
  sendVerificationEmail(recepient: string){
    var token = genTokenEmail(info);
    console.log("http://localhost:3000/verifyEmail/" + token);
    let info = {
      email: recepient,
      text: "http://localhost:3000/verifyEmail/" + token,
      html: "<div>http://localhost:3000/verifyEmail/ + token</div>"
    };
    this.sendVerificationEmail()
  }
}