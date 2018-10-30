const {app, BrowserWindow} = require('electron');
const express = require('express');
const path = require('path');
const httpServer = express();

let mainWindow;
let frontendUrl;

function generateFrontendUrl() {
	return `http://${frontendUrl.address}:${frontendUrl.port}`;
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	if(frontendUrl){
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
	port: 8000
}, (err) => {
	if(err){
		console.log(err);
		throw new Error('Cannot start internal http server');
	}
	frontendUrl = httpListener.address();

	const url = generateFrontendUrl();
	console.log(`Internal HTTP Server listening on ${url}`);

	if(mainWindow){
		mainWindow.loadURL(url);
	}
});