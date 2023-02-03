const path = require('path');
//console.log(path.join(__dirname, 'modules'));


const fs = require('fs');
const getFiles = function (dir, files){

	files = files || [];
	files = fs.readdirSync(dir);
	for (let i in files){
		const name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()){
			getFiles(name, files);
		} else {
			files.push(name);
		}
	}
	return files;
};

console.log();