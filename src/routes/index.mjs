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

async function getUserById(req) {
  const { userId } = req.params
  const users = this.mongo.db.collection('users')
  return users.findOne({ _id: new ObjectId(userId) })
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

async function getRestaurants() {
  const restaurants = this.mongo.db.collection('restaurants')

  return restaurants.find({}, { menu: 0 }).toArray()
}

async function getRestaurantById(req) {
  const { restId } = req.params
  const restaurants = this.mongo.db.collection('restaurants')
  return restaurants.findOne({ _id: new ObjectId(restId) }, { menu: 0 })
}

async function createRestaurant(req) {
  const restaurants = this.mongo.db.collection('restaurants')
  const data = req.body

  const { insertedId } = await restaurants.insertOne({
    location: {
      address: data.location.address,
      coordinates: data.location.coordinates,
    },
    name: data.name,
    cuisine: data.cuisine,
    menu: [],
  })
  return { restId: insertedId }
}

async function updateRestaurant(req) {
  const restaurants = this.mongo.db.collection('restaurants')
  const { id, ...data } = req.body
  const preparedData = filterNullishValues({
    'location.address': data.location.address,
    'location.coordinates': data.location.coordinates,
    name: data.name,
    cuisine: data.cuisine,
  })

  await restaurants.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: preparedData,
    }
  )
}

async function getRestaurantMenu(req) {
  const restaurants = this.mongo.db.collection('restaurants')
  const { restId } = req.params
  const { menu } = await restaurants.findOne(
    { _id: new ObjectId(restId) },
    { _id: 0, menu: 1 }
  )
  return menu
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
    method: 'GET',
    url: '/users/:userId',
    handler: getUserById,
    schema: {
      params: {
        userId: { type: 'string' },
      },
    },
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
    url: '/restaurants',
    handler: getRestaurants,
    schema: {},
  })

  fastify.route({
    method: 'GET',
    url: '/restaurants/:restId',
    handler: getRestaurantById,
    schema: {
      params: {
        restId: { type: 'string' },
      },
    },
  })

  fastify.route({
    method: 'POST',
    url: '/restaurants',
    handler: createRestaurant,
    schema: {
      body: {},
    },
  })

  fastify.route({
    method: 'PUT',
    url: '/restaurants',
    handler: updateRestaurant,
    schema: {
      body: {},
    },
  })

  fastify.route({
    method: 'GET',
    url: '/restaurants/:restId/menu',
    handler: getRestaurantMenu,
    schema: {
      params: {
        restId: { type: 'string' },
      },
    },
  })
}
