// ==UserScript==
// @name     Discord Bing Background
// @version  1
// @include https://discord.com/channels/*
// ==/UserScript==

window.addEventListener("load", () => {
	"use strict";

	function myLog(...args) {
		console.log(
			"[MESSG] Discord Bing Background:\n",
			args.reduce((prev, curr) => `${prev} ${curr}`));
	}

	function myError(...args) {
		console.error(
			"[ERROR] Discord Bing Background:\n",
			args.reduce((prev, curr) => `${prev} ${curr}`));
	}

	try {
		const bingUrl = "http://www.bing.com/HPImageArchive.aspx?format=xml&idx=0&n=1&mkt=en-US";

		const req = new XMLHttpRequest();
		req.open("GET", bingUrl, false);
		req.send();

		const bingXml = req.responseXML;
		const urlObj = bingXml.getElementsByTagName("url")[0];
		const imgUrl = `https://bing.com${urlObj.textContent}`;

		req.open("GET", imgUrl, false);
		req.responseType = "arraybuffer";
		req.send();

		const imgBlob = new Blob([req.response], {type: "image/jpeg"});
		const blobUrl = URL.createObjectURL(imgBlob);

		const img = document.createElement("img");
		img.id = "my-background";
		img.src = blobUrl;
		document.body.prepend(img);
	} catch (e) {
		myError(e);
	}
})();
