import env from './lib/env'

import Mole from './lib/Mole'

const mole = new Mole()

// console.log(mole)

if (env === 'test') {
	mole.add('model', 'model-name', ({ data }) => {
		data.color.red = "#FF00000"
		return data
	})

	mole.add('template', 'template-name', ({ data }) => {
		return `The color red is ${data.color.red}`
	})

	mole.build()

	console.log(mole)
}

export default mole
