import Mole from './lib/Mole'
import Model from './lib/Model'
import Template from './lib/Template'

const mole = new Mole()

mole.add(
	new Model('model-name', ({ data }) => {
		data.color.red = "#FF000"
		return data
	})
)

mole.add(
	new Template('template-name', () => {
		return 'I am {{color.red}}'
	})
)

mole.build()

console.log(mole)

export default mole
