
import uuid from 'node-uuid'
import { pub, sub } from '../redis'

import { verifyToken } from '../helpers/hash'

async function getMessages(roomId) {
  if (await pub.existsAsync(`rooms:${roomId}:messages`)) {
    return await pub.lrangeAsync(`rooms:${roomId}:messages`, -100, -1)
  } else {
    return []
  }
}

export const index = async (req, reply) => {
  try {
    const username = verifyToken(req)
    console.log(username)
    const roomIds = await pub.zrevrangeAsync(`users:${username}:rooms`, 0, -1)
    console.log(roomIds)
    const hydratedRooms = await Promise.all(roomIds.map(async (roomId) => {
      return {
        id: roomId,
        name: await pub.hgetAsync(`rooms:${roomId}`, 'name'),
        messages: await getMessages(roomId)
      }
    }))
    reply({
      rooms: hydratedRooms
    })
  } catch(e) {
    console.log('e', e)
  }
}

export const create = (username, msg) => {

}