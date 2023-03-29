import express from "express";
import nodemailer from "nodemailer";


//Envio de mails con nodemailer y testo con mailtrap

const app = express();

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "nicecup.ventas@gmail.com",
    pass: "pimstlgvbyklgvay",
  },
});

const transportMailtrap = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7a8f10b9de5896",
    pass: "457a6ce49126d7"
  }
});


const mails = ["caro_cm@gmail.com", "emiperez@gmail.com"]

app.get("/mail", async (req, res) => {
  const result = await transportMailtrap.sendMail({
    from: "coderhouse@gmail.com",
    to: mails,
    subject: "Prueba de envío de mail",
    html: `
      <div>
        <h1>Prueba de envío de mail</h1>
        <img src="cid:prueba_1" />
      </div>
    `,
    attachments: [
      {
        filename: "Alaplana.jpg",
        path: "./Imagenes/Alaplana.jpg",
        cid: "prueba_1",
      },
    ],
  });

  res.json({ result });
});

app.listen(3000, console.log("Server running on port 3000"));

