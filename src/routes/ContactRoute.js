import ContactController from '../controllers/ContactController'

export default (app) => {
	app.post('/contact/', ContactController.persist)
	app.patch('/contact/:id', ContactController.persist)
	app.delete('/contact/destroy:id', ContactController.destroy)
	app.get('/contact/', ContactController.get)
	app.get('/contact/:id', ContactController.get)
}