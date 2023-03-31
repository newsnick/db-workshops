import { ObjectId } from '@fastify/mongodb'

async function getUsers() {
  const users = this.mongo.db.collection('users')

  return users.find().toArray()
}

async function createUser(req) {
  const users = this.mongo.db.collection('users')
  const data = req.body

  const { insertedId } = await users.insertOne({
    phone_number: data.phone,
    fullname: data.fullName,
  })
  return { userId: insertedId }
}

export default async function routes(fastify, options) {
  fastify.get('/ping', function (req, reply) {
    reply.send({ message: 'pong' })
  })

  fastify.route({
    method: 'GET',
    url: '/users',
    handler: getUsers,
    schema: {},
  })

  fastify.route({
    method: 'POST',
    url: '/users',
    handler: createUser,
    schema: {
      body: {},
    },
  })
}
