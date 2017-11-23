# Cuis

[![Build Status](https://travis-ci.org/martjanz/cuis.svg?branch=master)](https://travis-ci.org/martjanz/cuis)

Cuis aims to be a simple tool to visualize PostGIS queries.

![Demo video](resources/demo.gif)

## Install

We provide two ways to use Cuis. One is a previously built desktop application,
batteries included. The other one is a local client-server Node.js Express
application.

### Desktop app

[Download the app for your platform (Linux / Mac / Windows).](https://github.com/martjanz/cuis/releases)

### Local client server

#### Requirements

* Node.js >= 6. [Download](https://nodejs.org/)

  To check your Node.js version run `node -v`

* _yarn_ package manager.

  With Node 6+ installed run `npm install -g yarn`.

* _Optional._ git. [Download](https://git-scm.com/)

  If you don't want to install anything else just
  [download the source code as a zip file](https://github.com/martjanz/cuis/archive/master.zip),
  unzip it and skip `git clone` step.

#### Steps

```bash
git clone --depth=1 https://github.com/martjanz/cuis
cd cuis
yarn build
yarn serve
```

## Development setup

### Backend server (Node.js - Express)

```bash
cd server
yarn start
```

### Frontend server (React)

```bash
cd ui
yarn start
```

### Electron builds

```bash
yarn build
yarn package-all
```

Builds will be stored on `./releases`
