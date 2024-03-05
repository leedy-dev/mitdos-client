<h1 align="center">
    <b>DY-DEV SYSTEM FRONT-END</b>
</h1>
<div align="center">

![version](https://img.shields.io/badge/version-0.1.0-blue.svg)

</div>

---
## Version
    - node : 20.11.1
    - yarn : 1.22.21
    - typescript : 4.4.2
    - react : 18.2.0
    - react redux : 9.1.0
    - react toolkit : 1.6.2
    - material ui : 5.15.11
    - axios : 1.6.7

---

## Structure
```
project
│   package.json            // package librarys 
│   tsconfig.json           // typescript config
│   tslint.json             // typescript lint
│   ...
└───publis                  // static public resources
│   └───static              
│   │   └───images          // static images
│   │   │   └───...
│   │   index.html          // index.html
│   │   ...
└───src
│   │   App.tsx             // Application init Component
│   │   index.tsx           // Application start Component    
│   │   router.tsx          // routers define
│   │   serviceWorker.ts    // network caching service
│   │   ...
│   └───app                 // store & hook
│   │   │   store.ts        // store define
│   │   │   hooks.ts        // hook define
│   └───components          // element components
│   │   └───...
│   └───content             // page & global contents
│   │   └───applications    // application base content page
│   │   │   └───...
│   │   └───dashboards      // dashboard page
│   │   │   └───...
│   │   └───pages           // page contents
│   │   │   └───...
│   └───featrues            // global state define & reduce, action define
│   │   └───...
│   └───layouts             // whole layout & sidebar layout
│   │   └───...
│   └───models              // model define
│   │   └───datas           // json request & response Data Model
│   │   └───states          // state data Model
│   └───servives            // CRUD Service by Axios
│   │   └───lib             // Axios define
│   └───theme               // theme 
│   │   └───schemes         // theme kind define
│   └───utils               // etc util function
│   │   └───constant        // global constant define    
```
---

## Quick Start
```bash
$ yarn install
$ yarn start

// build
$ yarn build

// distribute
$ yarn dist
```

---

## EXTRA RUN
```bash
// project reset & install for linux & osx
$ yarn clean 
// project reset & install for windows
$ yarn clean-win 

// project source code lint check
$ yarn lint
```