# docusaurus-post-generator
A cli tool like [hexo](https://hexo.io/docs/writing.html)'s `hexo new [post name]`

![demo](https://user-images.githubusercontent.com/11360957/184494907-0daa1973-d343-40fe-a72b-2fa7819044fa.gif)


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
yarn postgen new [template] [post_name] --type [type] 
```
args: 
- `post_name`: the post file name you want to add with.
- `template`: the corresponding template file in `template` folder.
- `type (optional)`: the type of the post content, either `doc` or `blog`, default set to `blog`. 

a example of script might like this: 

```
yarn postgen new frontend_template 'A technology of Javascript' 
```
### 4. Add a post to a subfolder of docs/blog
You can also add a post file into subfolder by adding a prefix like: 

```
yarn postgen new frontend_template 'javascript/A technology of Javascript'
```

and a file will be created at `blog/javascript/2022-08-13-A-technology-of-Javascript.md` in your project.
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
