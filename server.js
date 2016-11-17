'use strict';

const express = require('express');
const path    = require('path');
const app     = express();
const request = require('request');

const PASSWORD = 'peachtree';
const AUTH_GOPRO_REQUEST = `http://10.5.5.9/camera/PV?t=${PASSWORD}&p=%02`;
const GOPRO_VIDEO_STREAM = 'http://10.5.5.9:8080/live/amba.m3u8';

app.use(express.static(path.join(__dirname, 'public')));

let port = 8000;

if (typeof process.env.PORT !== 'undefined') {
  port = parseInt(process.env.PORT, 10);
}

app.listen(port);

app.get('/stream', (req, res)=> {

	res.set('Content-Type', 'application/x-mpegURL');
	
	request.get(AUTH_GOPRO_REQUEST, (err, response)=> {

		request.get(GOPRO_VIDEO_STREAM)
			.on('response', (response)=> {
				console.log(response.statusCode);
			})
			.on('error', (err)=> {
				console.log(err);
			})
			.pipe(res);
	});
});

console.log('web-site-template on http://0.0.0.0:%d', port);
