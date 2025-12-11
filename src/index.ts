import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import { User } from './User.model.js'
import * as AdminJSMongoose from '@adminjs/mongoose'
import mongoose from 'mongoose'

const PORT = 3001
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const start = async () => {
  await mongoose.connect('mongodb://localhost:27017/e-commerce')
  const app = express()

  const admin = new AdminJS({
    resources: [User],
    rootPath: '/admin',
  })

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()