import { getRestaurantsOrders, getUsersOrders, makeOrder } from './orders.mjs'
import { createUser, getUserById, getUsers, updateUser } from './users.mjs'
import { addProductsInMenu, createRestaurant, getRestaurantById, getRestaurantMenu, getRestaurants, removeProductFromMenu, updateRestaurant } from './rest.mjs'


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

  fastify.route({
    method: 'GET',
    url: '/restaurants/:restId/orders',
    handler: getRestaurantsOrders,
    schema: {
      params: {
        restId: { type: 'string' },
      },
    },
  })
}


