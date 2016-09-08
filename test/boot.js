'use strict'
let babelConfDev = require('react-scripts/config/babel.dev');
// Exclude a non validate props in babel conf
delete babelConfDev.cacheDirectory;
// Register babel conf
require('babel-core/register')(babelConfDev);

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
chai.use(sinonChai);
// Js dom
const jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {
    userAgent: 'node.js'
};

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

process.on('unhandledRejection', (error)=>{
    console.error('Unhandled Promise Rejection:');
    console.error(error && error.stack || error);
});
