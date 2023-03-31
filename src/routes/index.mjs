import { ObjectId } from '@fastify/mongodb'

function filterNullishValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != null)
  )
}

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

async function updateUser(req) {
  const users = this.mongo.db.collection('users')
  const { id, ...data } = req.body
  const preparedData = filterNullishValues({
    phone_number: data.number,
    fullname: data.fullName,
  })

  await users.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: preparedData,
    }
  )
}

// Task
// getRest
// createRest - with empty array in menu
// updateRest
// getRestMenu - take menu from rest

// Example of path param
async function getUserById(req) {
  const { userId } = req.params
  const users = this.mongo.db.collection('users')
  return users.findOne({ _id: new ObjectId(userId) })
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

  fastify.route({
    method: 'PUT',
    url: '/users',
    handler: updateUser,
    schema: {
      body: {},
    },
  })

  fastify.route({
    method: 'GET',
    url: '/users/:userId',
    handler: getUserById,
    schema: {
      params: {
        userId: { type: 'string' },
      },
    },
  })
}
