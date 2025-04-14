# TechnO'vice project

> [!WARNING]  
> Ce repository est une copie en l'état du projet de fin de formation avec l'école O'clock. il a été réalisé en collaboration avec Nicolas Bagat, Manon Leonard, Michael Parisi et Nasredine Fiker.
> This repository is an unaltered copy of the final project of the O'clock School training program. It was produced in collaboration with Nicolas Bagat, Manon Leonard, Michael Parisi and Nasredine Fiker. 

Bienvenue sur notre projet ! / Welcome to our project !

## Introduction

### EN

TechnO'vice, an educational platform dedicated to computer learning. The content offered on the platform aims to develop basic skills in the most important software, OS and websites.
It enables trainers to publish content on the platform so that they can share their knowledge.
Here are just a few examples: the basics of Word, how to make a purchase on Amazon, how to spot a malicious site.

### FR

TechnO’vice, une plateforme éducative dédiée à l'apprentissage de l’informatique. Les contenus proposés sur la plateforme visent à développer des compétences de base sur les plus importants logiciels, OS, et sites web.
Elle permet aux formateurs de publier du contenu sur la plateforme afin qu’ils puissent partager leurs connaissances.
En quelques exemples : Les bases du logiciel Word, comment faire un achat sur Amazon, comment repérer un site malveillant.

## Dependencies

Install all dependencies by running `npm run installation` in root project

### Front

-   [x] React
-   [x] React-dom
-   [x] React-icons
-   [x] React-auth-kit
-   [x] React-router-dom
-   [x] Vite
-   [x] Vitest
-   [x] Typescript
-   [x] Axios
-   [x] TailwindCSS
-   [x] PostCSS / Autoprefixer

### Back

-   [x] Nodejs
-   [x] Prisma
-   [x] Express
-   [x] dotenv
-   [x] PG
-   [x] cors
-   [x] joi
-   [x] mocha
-   [x] supertest
-   [x] bcrypt
-   [x] http-errors
-   [x] jsonwebtoken

### Others

-   [x] Prettier
-   [x] Eslint

## Environment configuration :

```
PORT=0000

DATABASE_URL=postgresql://nom_admin:mot_de_passe@hostname:port/nom_bdd?schema=public

ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString('hex')
REFRESH_TOKEN_SECRET = crypto.randomBytes(64).toString('hex')

```
