import file from '../src/lib/Config'
const putValuesInArray = file.__get__('putValuesInArray')
const normaliseConfig = file.__get__('normaliseConfig')
const config = file.__get__('config')

test('config file should be healthy', () => {
	expect(config).toBeTruthy()
})

test('should put value into an array', () => {
	expect(putValuesInArray('test')).toEqual(['test'])
})

test('should make array from model, template and output values of config', () => {
	const config = {
		theme: 'theme/',
		model: 'model-name',
		template: 'template-name',
		output: { file: 'styles.css' }
	}
	expect(normaliseConfig(config)).toEqual({
		theme: 'theme/',
		model: ['model-name'],
		template: ['template-name'],
		output: [{ file: 'styles.css' }]
	})
	console.info('Config =>', new file())
})