
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
var path = require('path');

let port = process.env.PORT;
if(port == null || port == "") {
	port = 4000;
}

const videoFolder = `${__dirname}/media/`;
const thumbFolder = `${__dirname}/images/`;
var mediaFiles = [];

app.use(cors());
app.use(express.static(path.join(__dirname,'/build')));

// Collecting video file name
fs.readdir(videoFolder, (err, files) => {
	files.forEach(file => {
		mediaFiles.push(file.split('.')[0]);
	});
});


// Sending video names
app.get('/video', (req, res) => res.json(mediaFiles));

// Thumbnail pictures
app.get('/video/:id/poster', (req, res) => {
	res.sendFile(thumbFolder+`${req.params.id}.jpg`);
});

// Streaming video data
app.get('/video/:id', (req, res) => {
	const path = videoFolder+`${req.params.id}.mp4`;
	const stat = fs.statSync(path);
	const fileSize = stat.size;
	const range = req.headers.range;

	if (range) {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10)
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
		if(start >= fileSize) {
		  res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
		}
		const chunksize = (end-start)+1
		const file = fs.createReadStream(path, {start, end})
		const head = {
		  'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		  'Accept-Ranges': 'bytes',
		  'Content-Length': chunksize,
		  'Content-Type': 'video/mp4',
		}
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4',
			};
		res.writeHead(200, head);
		fs.createReadStream(path).pipe(res);
	}

});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, () => console.log(`Listening on ${port}`));
