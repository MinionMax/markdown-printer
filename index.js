const dotenv = require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { Remarkable } = require("remarkable");
const md = new Remarkable();
const Discord = require("discord.js");
const client = new Discord.Client();


client.on("ready", () => {
    console.log("🚀 Ready to print...");
})

client.on("message", async (message) => {

    if (!message.content.startsWith("!MD")) return;
    if (message.content.startsWith("!MD")){
        console.log("✨ New print request")
        exportMD(message);
    }
})

async function exportMD(message){

    console.log("[1/5] ⚙️  Processesing Markdown...");
    message.react("⚙️");
    const input = message.content.split("!MD ")[1];
    console.log(input);
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
    snapMD(message);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function snapMD(message){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`file:${path.join(__dirname + "/public/index.html")}`);
    await sleep(1000);
    await page.waitForSelector("#output");
    const output = await page.$("#output");
    await output.screenshot({path: "assets/md.png"});
    console.log("[2/5] ✅ Markdown processed...");
    message.react("✅")
    print(message);
}

async function print(message){
    console.log("[3/5] 🖨  Printing...")
    await message.channel.send({files: ["assets/md.png"]});
    cleanup();
}

function cleanup(){
    console.log("[4/5] 🧹 Cleaning up...")
    fs.unlinkSync("assets/md.png");
    console.log("[5/5] 🎉 Done!");
    console.log("🚀 Ready to print...");
}

client.login(process.env.TOKEN);