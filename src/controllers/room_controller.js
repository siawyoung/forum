
import uuid from 'node-uuid'
import { pub, sub } from '../redis'
import { timestamp } from '../helpers/time'

export const create = (username, msg) => {

  const parsedMsg = JSON.parse(msg)
  console.log(parsedMsg)
  const name      = parsedMsg['name']
  const users     = [username, ...parsedMsg['users']]
  const roomId    = uuid.v4()
  pub.zaddAsync(`users:${username}:rooms`, timestamp(), roomId)
  pub.saddAsync(`rooms:${roomId}:users`, ...users)
  pub.hsetAsync(`rooms:${roomId}`, 'name', name)

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