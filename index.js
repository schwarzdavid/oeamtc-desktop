const {app, BrowserWindow} = require('electron');
const express = require('express');
const path = require('path');
const httpServer = express();

let mainWindow;
let internalPort;

function generateFrontendUrl() {
	return `http://localhost:${internalPort}/`;
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	if(internalPort){
		mainWindow.loadURL(generateFrontendUrl());
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

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

httpServer.use(express.static(path.resolve(__dirname, './public/dist')));
httpServer.get('*', (req, res) => {
	return res.sendFile(path.resolve(__dirname, 'public/dist/index.html'));
});

const httpListener = httpServer.listen({
	hostname: 'localhost',
	port: 8000
}, (err) => {
	if(err){
		console.log(err);
		throw new Error('Cannot start internal http server');
	}
	internalPort = httpListener.address().port;

	console.log(`Internal HTTP Server listening on port ${internalPort}`);

	if(mainWindow){
		mainWindow.loadURL(url);
	}
});