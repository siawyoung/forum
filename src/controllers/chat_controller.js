
import uuid from 'node-uuid'
import { pub, sub } from '../redis'

import { verifyToken } from '../helpers/hash'
import { timestamp } from '../helpers/time'
import { calculateColorOfMessage } from '../helpers/colors'

const rybColorMixer = require('../helpers/mix')

async function getMessages(roomId) {
  if (await pub.existsAsync(`rooms:${roomId}:messages`)) {
    return await pub.lrangeAsync(`rooms:${roomId}:messages`, -100, -1)
  } else {
    return []
  }
}

function sortRoomOrder(room1, room2) {
  if (room1.timestamp < room2.timestamp) {
    return 1
  } else if (room1.timestamp > room2.timestamp) {
    return -1
  } else {
    return 0
  }
}

export const index = async (req, reply) => {
  try {
    const username = verifyToken(req)
    // console.log(username)
    const roomIds = await pub.smembersAsync(`users:${username}:rooms`)
    // console.log(roomIds)
    const hydratedRooms = await Promise.all(roomIds.map(async (roomId) => {
      return {
        id: roomId,
        name: await pub.hgetAsync(`rooms:${roomId}`, 'name'),
        timestamp: await pub.hgetAsync(`rooms:${roomId}`, 'latest'),
        color: await pub.hgetAsync(`rooms:${roomId}`, 'color'),
        messages: await getMessages(roomId)
      }
    }))
    hydratedRooms.sort(sortRoomOrder)
    reply({
      rooms: hydratedRooms
    })
  } catch(e) {
    console.log('e', e)
  }
}

export const create = async (username, msg) => {

  try {
    const roomId = msg.roomId
    const messageTime = timestamp()

    const oldColor = await pub.hgetAsync(`rooms:${roomId}`, 'color')
    const msgColor = calculateColorOfMessage(msg.message)
    const newColor = `#${rybColorMixer.mix([oldColor, msgColor])}`

    const chatMessage = {
      timestamp: messageTime,
      message: msg.message,
      user: username,
    }
    pub.hmsetAsync(`rooms:${roomId}`, 'latest', messageTime, 'color', newColor)
    pub.rpushAsync(`rooms:${roomId}:messages`, JSON.stringify(chatMessage))

    pub.publish('messages:new', JSON.stringify({
      sockets: await pub.smembersAsync(`rooms:${roomId}:users`),
      message: {
        roomId,
        color: newColor,
        message: chatMessage
      }
    }))
  } catch(e) {
    console.log('messages:new error!', e)
  }


}