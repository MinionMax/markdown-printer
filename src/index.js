const dotenv = require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");
const express = require("express");
const app = express();
const { Remarkable } = require("remarkable");
const md = new Remarkable();
const Discord = require("discord.js");
const client = new Discord.Client();
const PORT = process.env.PORT || 3000;

client.on("ready", () => {
    console.log("Ready to print 🖨 \ncheck toner levels pls...");
})

client.on("message", async (message) => {

    if (!message.content.startsWith("!MD")) return;
    if (message.content.startsWith("!MD")){
        exportMD(message);
    }
})

async function exportMD(message){

    const input = message.content.split("!MD ")[1];
    const render = md.render(input);
    const output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <title>Document</title>
    </head>
    <body>
        <div id="output">
            ${render}
        </div>
    </body>
    </html>
    `;

    fs.writeFile("public/index.html", output, (err) => { if (err) throw err });
    snapMD();
}

async function snapMD(){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(`localhost:${PORT}/`);
    await page.waitForSelector("#output");
    const output = await page.$("#output");
    const res = await output.screenshot({path: "assets/md.png"});
    print();
    await browser.close();
}

function print(){

}

client.login(process.env.TOKEN);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "public", "index.html");
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})