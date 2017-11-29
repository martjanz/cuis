# Cuis

[![Build Status](https://travis-ci.org/martjanz/cuis.svg?branch=master)](https://travis-ci.org/martjanz/cuis)

Aiming to have a simple and dependency-free tool to visualize PostGIS queries I started this project. (QGIS)[http://www.qgis.org/en/site/] is enormously more powerful and complex but usually is a bit a pain in the @=! to download and install all those things just to see the result of a simple PostGIS query on a map, particularly on Mac OS (November 2017).

There is (another similar project)[https://github.com/lukasmartinelli/postgis-editor] which I consider to fork if you want to take a look. I didn't do it and started this one from scratch because I wanted to be able to run the _¿stack?_ both as a desktop application and as a client-server web application.

That's the _why_.

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
