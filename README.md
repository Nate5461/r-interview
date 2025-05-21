# r-interview

## How To Use

### Rebuilding app
The extension is already built in the dist folder but to rebuild run:

npm install
npm run build

in the root directory terminal

### Adding to browser
In the browser of choice go to manage extensions under the extensions option in the browser toolbar menus. Once the extension page is open turn on devloper options in the left menu on Edge or top right on Chrome. Once on you can click 'Load unpacked' and select the dist folder in the repository directory. 

Once the extension is added to the browser, you can pin it to the toolbar by clicking extensions and hitting the pin beside 'Read Page Extensions'.

### Using the extension
On any page of your choice click on the exension icon for it to run. It will then save that page's content to Firestore with the page URL, it will also output to the console as an easy check.