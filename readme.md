docusaurus-post-generator

## How to Use ?
###  1. Install
#### Install with npm 
`npm i --save-dev docusaurus-post-generator`
#### Install with yarn  
`yarn add -D docusaurus-post-generator`


### 2. add script into your docusaurus project 
```
...
  "scripts": {
    ...
    "postgen":"docusaurus-post-generator"  
  }
...
```


### 3. run script with `new` command

```
yarn postgen new [post_name] [template] --type [type] 
```
args: 
- `post_name`: the post file name you want to add with.
- `template`: the corresponding template file in `template` folder.
- `type (optional)`: the type of the post content, either `doc` or `blog`. 

## Template Example

```
---
slug: your-post-name
title: Your Post Name
authors: mujing
tags: [someTag]
hide_table_of_contents: false
---
```

Your can learn more about markdown file metadata [here](https://docusaurus.io/docs/blog#adding-posts).