# 2017PIM 

## Setting
On your terminal,
```bash
cd ~/(your_path)/2017PIM
npm install
npm start #This command will start your local server (http://localhost:8080/)
```

## Helpful thing
Because of webpack, you don't need to refresh your browser to check your code difference.<br>
It automatically refresh your canvas when file changes are found.

## Warning
1. Put your images to load in `/assets` folder.
2. If you want to load your image, use like: `loadImage('assets/image_file')`
3. Export your functions
```javascript
export function setup() { // Legacy: function setup()
```

## Contributor
- @sakemin (Main Developer)
- @hanyundo (Setted local server and npm packages)
