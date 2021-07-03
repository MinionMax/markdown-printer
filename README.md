# markdown-printer

## about
The "mardown-printer" is a simple discord bot, that converts your written markdown to the actual visuals it represents.<br>
As Discord doesn't support markdown completely this may be handy when absoloutely want to write Markdown, because you're weird idk...

## setup
create a bot application and copy its token into a new ".env" file in the root-directory of the project...
```
TOKEN={your token here}
```
invite the bot to your server.<br>
install yarn and run in your terminal while in the root-directory of the bot folder
```sh
yarn install
```

## usage
to start up the bot run
```sh
yarn start
```
the bot will now be going online, and print "🚀 Ready to print..." on the command line.<br>
to give it something to print use the "!MD" flag, followed by your markdown text...<br>
DO NOT insert a line break after the flag, otherwise it will not be recognised...<br>