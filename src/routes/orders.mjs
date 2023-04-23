import { ObjectId } from '@fastify/mongodb'
import { filterNullishValues } from './helper.mjs'

const ORDER_STATUSES = {
  pending: 'pending',
  cooking: 'cooking',
  ready: 'ready',
  completed: 'completed',
}

export async function makeOrder(req) {
  const orders = this.mongo.db.collection('orders')
  const orderData = req.body
  // TODO: add validation for product list
  const { insertedId } = await orders.insertOne({
    restaurant_id: new ObjectId(orderData.restId),
    user_id: new ObjectId(orderData.userId),
    product_list: orderData.products.map((product) => {
      
      return { id: new ObjectId(product.id), amount: product.amount }
    } ),
    status: ORDER_STATUSES.pending,
  })
  
  return { orderId: insertedId }
}


// TODO: should return all orders by default not completed for this rest
// additional: query params option to filter orders by status

export async function getRestaurantsOrders(req) {
  const orders = this.mongo.db.collection('orders')
  const { restId } = req.params

  const filter = { restaurant_id: new ObjectId(restId) }

  const result = await orders.find(filter).toArray()

  return result
}


// TODO: should return all orders by default not completed for this rest
// additional: query params option to filter orders by status


export async function getUsersOrders(req) {
  const orders = this.mongo.db.collection('orders')
  const { userId } = req.params
  const { status } = req.query

  const query = {
    user_id: new ObjectId(userId),
    status: { $ne: ORDER_STATUSES.completed },
  }
  return orders.find(query).toArray()
}

export async function changeOrderStatus(req) {
  const { orderId } = req.params
  const { status } = req.body

  const orders = this.mongo.db.collection('orders')
  const filter = { _id: ObjectId(orderId) }
  const update = { $set: { status } }
  const options = { returnOriginal: false }

  const result = await orders.findOneAndUpdate(filter, update, options)

  if (!result.value) {
    throw new Error(`Order with ID ${orderId} not found`)
  }

  return result.value
}