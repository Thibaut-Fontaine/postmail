const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/',function(req, res) {
	console.log(req.body);
	sendmail(req.body.recipient, req.body.subject, req.body.text);
	res.send('');
});

function sendmail(recipient, subject, text) {
	nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'postmail@gmail.com',
			pass: ''
		}
	}).sendMail({
		from: 'postmail@gmail.com',
		to: recipient,
		subject: subject,
		text: text
	}, function(err, info) {
	if (err) {
		console.log(err);
	} else {
		console.log('Email sent: ' + info.response);
	}});
}

app.listen(5000);
