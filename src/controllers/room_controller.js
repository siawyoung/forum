
import uuid from 'node-uuid'
import { pub, sub } from '../redis'
import { timestamp } from '../helpers/time'

export const create = (username, msg) => {

  const name      = msg.name
  const users     = [username, ...msg.users]
  const roomId    = uuid.v4()
  users.forEach(user => {
    pub.saddAsync(`users:${user}:rooms`, roomId)
  })
  pub.saddAsync(`rooms:${roomId}:users`, ...users)
  pub.hmsetAsync(`rooms:${roomId}`, 'name', name, 'latest', timestamp(), 'color', '#333333')

  pub.publish('rooms:created', JSON.stringify({
    sockets: users,
    message: {
      id: roomId,
      name: name,
      messages: [],
      color: '#333333',
    }
  }))

}

export const remove = (req, reply) => {

}