const fse = require('fs-extra');
const CleanCSS = require('clean-css');
const HTMLMinifier = require('html-minifier');
const terser = require('terser');

const sourceDir = './src';
const distDir = './dist';

fse.copyFileSync('index.html', distDir + '/index.html');
fse.copySync(sourceDir, distDir + '/src');

const fs = require('fs');
const path = require('path');

function getFilePaths(directoryPath) {
    let files = fs.readdirSync(directoryPath);
    let filePaths = [];

    for (let file of files) {
        let fullPath = path.join(directoryPath, file);

        let stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            let subDirFilePaths = getFilePaths(fullPath);
            filePaths = filePaths.concat(subDirFilePaths);
        } else {
            filePaths.push(fullPath);
        }
    }
    return filePaths;
}

async function minifyFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let minifiedContent;

    if (filePath.endsWith('.js')) {
        const minifyResult = await terser.minify(fileContent);
        if (minifyResult.error) {
            console.error(`Error minifying file: ${filePath}`, minifyResult.error);
            return;
        }
        minifiedContent = minifyResult.code;
    } else if (filePath.endsWith('.css')) {
        const output = new CleanCSS({}).minify(fileContent);
        minifiedContent = output.styles;
    } else if (filePath.endsWith('.html')) {
        minifiedContent = HTMLMinifier.minify(fileContent, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
        });
    } else {
        console.log(`Skipped minification for file: ${filePath}`);
        return;
    }

    if (minifiedContent) {
        fs.writeFileSync(filePath, minifiedContent, 'utf8');
        console.log(`Minified file: ${filePath}`);
    } else {
        console.log(`not Minified file: ${filePath}`);
    }
}

const filePaths = getFilePaths(distDir);

filePaths.forEach(minifyFile);