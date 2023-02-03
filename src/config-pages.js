const path = require("path");
const fs = require('fs');
const getFiles = function (dir, files){

	files = files || [];
	files = fs.readdirSync(dir);
	for (let i in files){
		const name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()){
			getFiles(name, files);
		}
	}
	return files;
};

module.exports = getFiles(path.join(__dirname, 'pages'))
