![logo](src/main/resources/documentation/app-logo-with-text.png)

### Contents

1. [Version](#1-version)
2. [Description](#2-description)
3. [Repository](#3-repository)
4. [Technology stack](#4-technology-stack)
5. [Architecture](#5-architecture)
6. [Flow diagram](#6-flow-diagram)
7. [Sequence diagram](#7-sequence-diagram)
8. [Database design](#8-database-design)
9. [API producer](#9-api-producer)
10. [API consumer](#10-api-consumer)
11. [Project structure](#11-project-structure)
12. [Development steps](#12-development-steps)
13. [Environment properties](#13-environment-properties)
14. [Running application](#14-running-application)
15. [Tools](#15-tools)
16. [Organization structure](#16-organization-structure)
17. [Timeline](#17-timeline)
18. [Tasks](#18-tasks)
19. [Testscripts](#18-tasks)

### 1. Version

| Date       | Version | Author                                               | Changelog       |
| ---------- | ------- | ---------------------------------------------------- | --------------- |
| 2022-10-05 | 1.0.0   | Aditya Pratama Nur, Claudio Antonius, Chaerul Marwan | Initial release |

[**Back to contents**](#contents)

### 2. Description

**Webview Tap In Insurance (project : Business Portal Web)** is a webview for Tap In Insurance product detail and policy. For now this project contains features:

1. Product Detail
2. Product Policy

Furthermore, it will have even more feature.

[**Back to contents**](#contents)

### 3. Repository

You can access Tap-in Webview

- staging [tapin-webview-apps-hgg9.vercel.app](https://tapin-webview-apps-hgg9.vercel.app/insurance/ci)
- repository [here](https://andromeda.ottopay.id/pt-rtsm-ottopay/bp-fe-web).

[**Back to contents**](#contents)

### 4. Technology stack

- React : A JavaScript library for building user interfaces, link [here](https://reactjs.org/).
- Wieldy : is a complete React admin template & starter-kit that follows Ant Design Concept and implements Ant Design framework to develop a react app., link [here](https://g-axon.com/wieldy-ant-design-react-redux-admin-template/).
- Ant Design : A design system for enterprise-level products. Create an efficient and enjoyable work experience, link [here](https://ant.design/).

[**Back to contents**](#contents)

### 5. Architecture

N/A

[**Back to contents**](#contents)

### 6. Flow diagram

N/A

[**Back to contents**](#contents)

### 7. Sequence diagram

N/A

[**Back to contents**](#contents)

### 8. Database design

N/A

[**Back to contents**](#contents)

### 9. API producer

N/A

[**Back to contents**](#contents)

### 10. API Consumer

N/A

[**Back to contents**](#contents)

### 11. Project structure

> **middleware** : folder that containing file to running build result

> **apps/build** : folder that containing build result

> **apps/src** : folder that containing source code, resources

> **apps/public** : folder that containing images, icons or media

[**Back to contents**](#contents)

### 12. Development steps

- Go to folder apps

```
cd apps
```

- Copy environment

```
cp .env.dev.example .env
```

- Install package

```
yarn install
```

- running app as development mode

```
yarn start
```

[**Back to contents**](#contents)

### 13. Environment properties

Environment properties saved in "key-value" format files placed on "apps" & "middleware" folder :

- Development :
  1. apps/.env.dev.example
  2. middleware/.env.dev.example
- Production :
  1. apps/.env.production.example
  2. middleware/.env.production.example

These properties file can be leverage to handle more environment in the future, you can rename the used environment file with .env example:
**cp apps/.env.dev.example .env**

[**Back to contents**](#contents)

### 14. Running application

==as **development**==

- Copy Dockerfile

```
cp Dockerfile.dev Dockerfile
```

- Build docker image

```
docker build -t ottopay-web:latest .
```

- Create docker container and run container

```
docker run --rm -d -it --name ottopay-web -p 3001:3001 ottopay-web:latest
```

\*note 3001 = the port used to serve the application

==as **production**==

- Copy Dockerfile

```
cp Dockerfile.prd Dockerfile
```

- Build docker image

```
docker build -t ottopay-web:latest .
```

- Create docker container and run container

```
docker run --rm -d -it --name ottopay-web -p 3001:3001 ottopay-web:latest
```

\*note 3001 = the port used to serve the application

[**Back to contents**](#contents)

### 15. Tools

- [Yarn](https://yarnpkg.com/) is a package manager that doubles down as project manager, install yarn stable [here](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).
- [Visual Studio Code](https://code.visualstudio.com/) as IDE (Integrated Development Environment).

[**Back to contents**](#contents)

### 16. Author

| Name               | Role                | Email                           | Capabilities  |
| ------------------ | ------------------- | ------------------------------- | ------------- |
| Aditya Pratama Nur | Tech Lead           | aditya@weekendinc.com           | Web Developer |
| Claudio Antonius   | Front End Developer | claudio.antonius@weekendinc.com | Web Developer |
| Chaerul Marwan     | Front End Developer | chaerul.marwan@weekendinc.com   | Web Developer |

[**Back to contents**](#contents)

### 17. Timeline

N/A

[**Back to contents**](#contents)

### 18. Tasks

N/A

[**Back to contents**](#contents)

### 19. Testscripts

N/A

[**Back to contents**](#contents)
