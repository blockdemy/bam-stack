import * as express from 'express'
//import User from './db/models/User'
//import { initializeServices } from './services'

export const initialize = (app: express.Application) => {
  /**
   * will be good for namespacing certain routes
   *  - /service_1
   *  - /service_2
   *  - etc
   */

  app.get('/bam', (req, res) => {
    // render the response
    res.json({ message: `BAM API: ${new Date().toISOString()}` })
  })

  app.get('/db-test', async (req, res, next) => {
    try {

      //const user = await User.findAll()

      /*res.json({
        data: { user, test: 'testing the db' },
        timestamp: new Date().toISOString(),
      })*/

	res.json({message: 'Gr8 :) buddy ...'})
    } catch (error) {
      next(error)
    }
  })

  //initializeServices(app)
}
