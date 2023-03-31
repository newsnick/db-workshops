import { ObjectId } from '@fastify/mongodb'

async function getUsers() {
  const users = this.mongo.db.collection('users')

  return users.find().toArray()
}

export default async function routes(fastify, options) {
  fastify.get('/ping', function (req, reply) {
    reply.send({ message: 'pong' })
  })

  fastify.route({
    method: 'POST',
    url: '/',
    handler: getUsers,
    schema: {
      body: {},
    },
  })
}
