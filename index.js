#!/usr/bin/env node

const cli = require('commander');
const newPost = require('./actions/new')

cli.description("A simple CLI for you to generate a docusaurus content file.");
cli.name("docusaurus-postgen");

cli.usage("<command>");
cli.addHelpCommand(false);
cli.helpOption(false);
 



cli
  .command("new")
  .argument("<template>", "The template to use for the new post.")
  .argument("<title>", "The title of the post.")
  .description(
    `Generate a new post from a template. 
      If no template is provided, 
      the default template will be used.`
  )
  .action(newPost);



  cli.parse(process.argv);