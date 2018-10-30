const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, './public/dist')));
app.get('*', (req, res) => {
	return res.sendFile(path.resolve(__dirname, 'public/dist/index.html'));
});

app.listen(8080, (err) => {
	if(err){
		throw new Error(err);
	}
	console.log('Server running');
});