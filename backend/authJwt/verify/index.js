const { host }    = require('../../config');
const nodemailer = require('nodemailer');

let color = 'rgb(106, 179, 72)';
let url = undefined;

const ServerNode  = host.serve;
const Port        = host.port;

export default {

    token_send_mail: async(user, token)=>{
        if(process.env.NODE_ENV !== 'production'){
            url = ServerNode + Port + '/api/auth/email/verify/' + token; 
        }else{
            url = ServerNode + Port + '/api/auth/email/verify/' + token;
        }
        let { name, email} = user;
        let contenHTML = `<div style="min-width: 100vh; 
                    min-height: 100vh; 
                    background-color: rgb(240, 240, 240); 
                    font-family: Roboto, Helvetica, sans-serif;">

            <div style="padding: 10px 0;
                        border-bottom: solid 1px rgb(220,220,220);">

                <h2 style="text-align: center;">Monongo Graphic</h2>
            </div>
            <div style="max-width: 80%; 
                        margin: auto 10%; 
                        background-color: white; 
                        font-size: 20px;">

                <div style="width: 100%; padding: 10px;">
                    <p><strong style="font-size: 28px;">Hello! ${name} </strong></p>
                    <p style="color: grey;">Please click the button below to verify your email address.</p>
                </div>

                <div style="display: block;
                            width: 100%;
                            padding: 50px 10px;
                            text-align: center;
                            text-decoration: none;">
                    <a href="${url}" 
                        target="_blank"
                        style="background-color: ${color}; 
                        padding: 10px 20px; 
                        font-weight: bold; 
                        color: white; 
                        text-align: center; 
                        text-decoration: none;">

                        Verify email address.
                    </a>
                </div>
                <div style="width: 100%; 
                            padding: 10px; 
                            text-decoration: none; 
                            color: grey;">

                    <p>it you did not create an account, no further action is required</p>
                    <p>
                        Regards.<br/>
                        Monongo Graphic
                    </p>
                </div>
                <div style="width: 100%; 
                            padding: 10px; 
                            text-decoration: none; 
                            color: grey;">

                    <small>
                        if you're having trouble click the "Verify Email Address" button, 
                        copy and paste the URL. below into your web browser:
                        <a href="${url}" target="_blank">
                            ${url}
                        </a>
                    </small>
                    
                </div>
            </div>
        </div>
        `;
        
        const transport = nodemailer.createTransport(
            {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT || 2525,
                secure: false,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            }
        );

        const response = await transport.sendMail({
                from: `'"Mongo Graphic" '<${process.env.MAIL_USERNAME}>`,
                to: email,
                subject: 'mongo graphic verification system',
                text: 'Hello word ',
                html: contenHTML
            });

        console.log('Message send id: ', response.messageId);
        console.log('Message send id: ', nodemailer.getTestMessageUrl(response));
        //console.log('Message send content: ', contenHTML);
    }

}