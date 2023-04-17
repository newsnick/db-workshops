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

  return restaurants.find({}, { projection: { menu: 0 } }).toArray()
}

async function getRestaurantById(req) {
  const { restId } = req.params
  const restaurants = this.mongo.db.collection('restaurants')
  return restaurants.findOne(
    { _id: new ObjectId(restId) },
    { projection: { menu: 0 } }
  )
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
    { projection: { _id: 0, menu: 1 } }
  )
  return menu
}

async function addProductsInMenu(req) {
  const restaurants = this.mongo.db.collection('restaurants')
  const data = req.body
  const { restId } = req.params

  const products = data.map(({ name, price }) => {
    return {
      _id: new ObjectId(),
      name,
      price,
    }
  })

  return restaurants.updateOne(
    { _id: new ObjectId(restId) },
    { $push: { menu: { $each: products } } }
  )
}

async function removeProductFromMenu(req) {
  const restaurants = this.mongo.db.collection('restaurants')
  const { restId, productId } = req.params

  return restaurants.updateOne(
    { _id: new ObjectId(restId) },
    { $pull: { menu: { _id: new ObjectId(productId) } } }
  )
}

const ORDER_STATUSES = {
  pending: 'pending',
  cooking: 'cooking',
  ready: 'ready',
  completed: 'completed',
}

async function makeOrder(req) {
  const orders = this.mongo.db.collection('orders')
  const orderData = req.body
  // TODO: add validation for product list
  const { insertedId } = await orders.insertOne({
    restaurant_id: orderData.restId,
    user_id: orderData.userId,
    product_list: orderData.products,
    status: ORDER_STATUSES.pending,
  })
  return { orderId: insertedId }
}

// TODO: should return all orders by default not completed for this rest
// additional: query params option to filter orders by status
async function getRestaurantsOrders(req) {}

// TODO: should return all orders by default not completed for this rest
// additional: query params option to filter orders by status
async function getUsersOrders(req) {}

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

  fastify.route({
    method: 'POST',
    url: '/restaurants/:restId/menu',
    handler: addProductsInMenu,
    schema: {
      params: {
        restId: { type: 'string' },
      },
      body: {
        type: 'array',
      },
    },
  })

  fastify.route({
    method: 'DELETE',
    url: '/restaurants/:restId/menu/:productId',
    handler: removeProductFromMenu,
    schema: {
      params: {
        restId: { type: 'string' },
        productId: { type: 'string' },
      },
    },
  })

  fastify.route({
    method: 'POST',
    url: '/order',
    handler: makeOrder,
    schema: {
      body: {},
    },
  })
}
