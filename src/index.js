const dotenv = require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://markdownlivepreview.com/");
    await page.evaluate(() => {
        var parent = document.querySelector(".ace_content");
        var child = document.querySelector(".ace_layer.ace_text-layer")
        parent.removeChild(child);
    })
    await page.waitForSelector("#output");
    const output = await page.$("#output");
    const res = await output.screenshot({path: "assets/md.png"});
    print();
    await browser.close();
    
}

function print(){

}

client.login(process.env.TOKEN);