# Introduction

For work with this server you need to initialize all variables in your .env file
As example you can use .env.example file

Also you can check main structure of BD.
![alt text](image-5.png)

# First pass (will be important in future)

Configuration of smtp email.

We have 4 variables for smtp config.

First two don't need to be changed
SMTP_HOST=smtp.gmail.com //default smtp for gmail
SMTP_PORT=587 //Port for TLS: 587

Your gmail for send registration mails
SMTP_USER=yourgmail@gmail.com

To get password, in options gmail need to do some configurations

1. Enter to your google account configuration
   ![alt text](image.png)
2. Enable two factor authentication
3. Click to two factor authentication configs
4. In the end of page pass to Application passwords and create one
   ![alt text](image-1.png)
   Pass example : dcba text four abcd
   SMTP_PASSWORD=dcba text four abcd

# Second pass. Create mongo database

1.Enter https://www.mongodb.com/ 2. Login 3. Create new project. MB will look different, i already have two projects.
![alt text](image-2.png)
4.Press connect button
![alt text](image-3.png)
5.Copy DB address and add your password <\password>

DB=mongodb+srv://nickname:password@some.text.with.dots.mongodb.net/?retryWrites=true&w=majority

![alt text](image-4.png)

# Firth pass. Additional data

1. PORT of our server. Can be used default from .env.example
   PORT=5000

2. Secret words, doesn't matter what will be written
   JWT_ACCESS_SECRET=sometext
   JWT_REFRESH_SECRET=anothersometext

3. Server-clent urls. Can be default.
   API_URL=http://localhost:5000
   CLIENT_URL=http://localhost:5173
