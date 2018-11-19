const {app, BrowserWindow} = require('electron');
const web = require('./server');
const path = require('path');

let mainWindow;
let internalPort;

function generateFrontendUrl() {
	return `https://localhost:${internalPort}/`;
}

function createWindow() {
	mainWindow = new BrowserWindow({
		minWidth: 1024,
		minHeight: 768,
		icon: path.resolve(__dirname, 'icon.png'),
		autoHideMenuBar: true
	});

	if(internalPort){
		mainWindow.loadURL(generateFrontendUrl());
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

app.on('ready', createWindow);
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', () => {
	if(!mainWindow){
		createWindow();
	}
});

web.run().then(port => {
	internalPort = port;
	if(mainWindow){
		mainWindow.loadURL(generateFrontendUrl());
	}
}).catch(err => {
    console.log(err);
    throw new Error('Cannot start internal http server');
});