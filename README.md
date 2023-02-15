# irwm-hub-table

Reusable ESRI table widget with a download button. Multiple tables can be configured by specifying a url parameter (visible  [here](https://www.southocirwm.org/pages/stormwater)).


# What is Svelte?

Svelte is a new way to build web applications. It's a compiler that takes your declarative components and converts them into efficient JavaScript that surgically updates the DOM.

Learn more at the [Svelte website](https://svelte.dev), or stop by the [Discord chatroom](https://svelte.dev/chat).


# Development

Clone this repo
```
git clone https://github.com/jgrew/irwm-hub-table.git
cd land-development
npm install
```

Run development server
```
npm run dev
```

Building

Edit base url in package.json "vite build --base=path/to/host/location" 

See more here: [Vite Public Base Path](https://vitejs.dev/guide/build.html)

```
npm run build
```

# Configuration
Each table configuration is looked up by providing a url parameter like so:
```
https://ocgis.com/ocpw/envres/irwm-table/index.html?key=swrp
```


This urlKey is used in /src/store/config to set relevant configuration