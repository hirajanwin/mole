"use strict";

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _voca = _interopRequireDefault(require("voca"));

var _mole = _interopRequireDefault(require("./mole"));

var _templateTest = _interopRequireDefault(require("../plugins/templateTest"));

var _modelTest = _interopRequireDefault(require("../plugins/modelTest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mole["default"].plugins.templates = [_templateTest["default"]];
_mole["default"].plugins.models = [_modelTest["default"]]; // // var env = new nunjucks.Environment()
// const env = nunjucks.configure()
// function renderTemplate(string, data) {
// 	return env.renderString(string, data)
// }
// function getContentFromDirs(path, output) {
// 	let files = glob.sync(path + output.name + '/*')
// 	let strings = []
// 	for (let i = 0; i < files.length; i++) {
// 		// console.log(fs.readFileSync(files[i], 'utf8'))
// 		strings.push(fs.readFileSync(files[i], 'utf8'))
// 	}
// 	// TODO: needs to parse the string using template renderer with associated model
// 	return strings.join('\n')
// }
// // New function
// function parseTemplates(template, output) {
// 	if (Array.isArray(template)) {
// 		for (let i in template) {
// 			template = template[i]
// 			let DIRREG = /.+\/.?/im
// 			let isFunction = typeof template === 'function'
// 			let isObject = typeof template === 'object'
// 			let isDir = DIRREG.test(template)
// 			let isNamedOutput = output && output.name
// 			if (isFunction) {
// 				console.log('template is function')
// 				return 'should be function'
// 			} else if (isObject) {
// 				console.log('template is object')
// 				return {
// 					content: output.template.result,
// 					path: output.file
// 				}
// 			} else if (isDir && isNamedOutput) {
// 				console.log('template is directory')
// 				return {
// 					content: getContentFromDirs(template, output),
// 					path: output.file
// 				}
// 			} else {
// 				for (let registeredTemplate of mole.plugins.templates) {
// 					if (template === registeredTemplate.name) {
// 						return {
// 							// TODO: needs to parse the string using template renderer with associated model
// 							content: renderTemplate(
// 								registeredTemplate.string,
// 								mole.model
// 							),
// 							// content: registeredTemplate.string,
// 							path: output.file
// 						}
// 					} else {
// 						return template
// 					}
// 				}
// 			}
// 		}
// 	} else {
// 		return parseTemplates([template], output)
// 	}
// }
// function processModels(model, output) {
// 	if (Array.isArray(model)) {
// 		for (let i in model) {
// 			model = model[i]
// 			let DIRREG = /.+\/.?/im
// 			let isFunction = typeof model === 'function'
// 			let isObject = typeof model === 'object'
// 			let isDir = DIRREG.test(model)
// 			let isNamedOutput = output && output.name
// 			if (isFunction) {
// 				console.log('model is function')
// 				return 'should be function'
// 			} else if (isObject) {
// 				console.log('model is object')
// 				return {
// 					model: output.model.result,
// 					path: output.file
// 				}
// 			} else if (isDir && isNamedOutput) {
// 				console.log('model is directory')
// 				return {
// 					model: getContentFromDirs(model, output),
// 					path: output.file
// 				}
// 			} else {
// 				for (let registeredModel of mole.plugins.models) {
// 					if (model === registeredModel.name) {
// 						return {
// 							model: registeredModel.string,
// 							path: output.file
// 						}
// 					} else {
// 						return model
// 					}
// 				}
// 			}
// 		}
// 	} else {
// 		return processModels([model], output)
// 	}
// }
// function generateContents(outputs) {
// 	let files = []
// 	for (let output of outputs) {
// 		// This only mutates an object. It does not return anything
// 		processModels(output.model, output)
// 		files.push(parseTemplates(output.template, output))
// 	}
// 	return files
// }
// mole.files = generateContents(mole.outputs)
// export default mole