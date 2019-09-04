import fs from 'fs'
import jsonnet from '@unboundedsystems/jsonnet'
import glob from 'glob'
import is from '../util/is'
import data from './Data'

import { Data } from './Data'

const RE_JS = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/im
const RE_JSONNET = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/im

class Theme {
	constructor() {
		return this
	}
	set(value, config) {

		// Parses the theme
		let result
		if (is.what(value) === 'path' || is.what(value) === 'file' || is.what(value) === 'dir') {

			// If theme not specified in config use value set by user
			if (!config.theme) {
				config.theme = value

			}

			let path = getThemePath(config)

			if (RE_JS.test(path)) {
				result = require(file)

			}
			if (RE_JSONNET.test(path)) {

				const getFile = fs.readFileSync(path).toString()

				const jsonnetVm = new jsonnet.Jsonnet()

				result = jsonnetVm.eval(getFile)

				jsonnetVm.destroy()
			}
		} else if (is.what(value) === 'object') {
			result = value
		} else {
			result = {}
		}

		// If theme already set then merge with new settings
		if (theme.result) {
			result = Object.assign(theme.result, result)
		}

		console.log('theme ->', result)
		Object.assign(this, result)
		Data.update(this)
	}
}

function getThemePath(config) {

	let path = ''
	let files

	// If theme is specified as a dir
	if (is.what(config.theme) === 'dir') {
		files = glob.sync(config.root + config.theme + '**/*')
	}

	// If theme is specified as a file
	if (is.what(config.theme) === 'file') {
		console.log('theme path ->', config.root + config.theme)
		files = glob.sync(config.root + config.theme)

	}

	// Check if file is one of supported extensions
	files.map(function(file) {
		if (RE_JS.test(file) || RE_JSONNET.test(file)) {
			path = file
		}
	})

	return path
}

const theme = new Theme()

export default theme
