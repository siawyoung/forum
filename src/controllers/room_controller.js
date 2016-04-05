
import uuid from 'node-uuid'
import { pub, sub } from '../redis'
import { timestamp } from '../helpers/time'

export const create = (username, msg) => {

  const name      = msg.name
  const users     = [username, ...msg.users]
  const roomId    = uuid.v4()
  pub.saddAsync(`users:${username}:rooms`, roomId)
  pub.saddAsync(`rooms:${roomId}:users`, ...users)
  pub.hmsetAsync(`rooms:${roomId}`, 'name', name, 'latest', timestamp())

  pub.publish('rooms:created', JSON.stringify({
    sockets: [username],
    message: {
      id: roomId,
      name: name,
      messages: []
    }
  }))

}

export const remove = (req, reply) => {

}