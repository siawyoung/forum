
import Promise from 'bluebird'
import uuid from 'node-uuid'
import { pub, sub } from '../redis'
import { client as knox } from '../knox'

import { verifyToken } from '../helpers/hash'
import { timestamp } from '../helpers/time'
import { palette, calculateColorOfMessage } from '../helpers/colors'

const rybColorMixer = require('../helpers/mix')

// const putBufferAsync = Promise.promisify(knox.putBuffer)

async function getMessages(roomId) {
  if (await pub.existsAsync(`rooms:${roomId}:messages`)) {
    return (await pub.lrangeAsync(`rooms:${roomId}:messages`, -100, -1)).map(x => { return JSON.parse(x) })
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

    let stickers = await pub.hgetallAsync(`users:${username}:stickers`)

    for (let s in stickers) {
      stickers[s] = JSON.parse(stickers[s])
    }

    reply({
      rooms: hydratedRooms,
      stickers
    })
  } catch(e) {
    console.log('e', e)
  }
}

export const create = async (username, msg) => {

  try {
    const roomId = msg.roomId
    const messageTime = timestamp()

    pub.lpushAsync(`rooms:${roomId}:colors`, calculateColorOfMessage(msg.message))
    pub.ltrimAsync(`rooms:${roomId}:colors`, 0, 9)
    const newColors = await pub.lrangeAsync(`rooms:${roomId}:colors`, 0, 9)
    const mixedColor = `#${rybColorMixer.mix(newColors)}`

    const chatMessage = {
      timestamp: messageTime,
      message: msg.message,
      user: username,
    }
    pub.hmsetAsync(`rooms:${roomId}`, 'latest', messageTime, 'color', mixedColor)
    pub.rpushAsync(`rooms:${roomId}:messages`, JSON.stringify(chatMessage))

    pub.publish('messages:new', JSON.stringify({
      sockets: await pub.smembersAsync(`rooms:${roomId}:users`),
      message: {
        roomId,
        color: mixedColor,
        message: chatMessage
      }
    }))
  } catch(e) {
    console.log('messages:new error!', e)
  }
}

export const sticker = async(username, msg) => {
  try {
    const {roomId, emotion} = msg
    const messageTime = timestamp()
    const sticker = JSON.parse(await pub.hgetAsync(`users:${username}:stickers`, emotion))
    pub.lpushAsync(`rooms:${roomId}:colors`, palette[emotion])
    pub.ltrimAsync(`rooms:${roomId}:colors`, 0, 9)
    const newColors = await pub.lrangeAsync(`rooms:${roomId}:colors`, 0, 9)
    const mixedColor = `#${rybColorMixer.mix(newColors)}`

    const chatMessage = {
      timestamp: messageTime,
      sticker: true,
      audio: sticker.audio,
      video: sticker.video,
      user: username
    }

    pub.hmsetAsync(`rooms:${roomId}`, 'latest', messageTime)
    pub.rpushAsync(`rooms:${roomId}:messages`, JSON.stringify(chatMessage))

    pub.publish('messages:new', JSON.stringify({
      sockets: await pub.smembersAsync(`rooms:${roomId}:users`),
      message: {
        roomId,
        color: mixedColor,
        message: chatMessage
      }
    }))
  } catch(e) {
    console.log(`stickers:new error!`, e)
  }
}

const putBufferAsync = Promise.promisify(knox.putBuffer, { context: knox })

export const create_sticker = async (req, reply) => {
  try {

    const username = verifyToken(req)
    const { audio, video, emotion } = req.payload

    const stickerId = uuid.v4()
    const audioRes = (await putBufferAsync(audio, `/audio/${username}-${emotion}-${stickerId}.wav`, {
      'Content-Type': 'audio/wav',
      'x-amz-acl': 'public-read'
    })).req.url

    const videoRes = (await putBufferAsync(video, `/video/${username}-${emotion}-${stickerId}.webm`, {
      'Content-Type': 'video/webm',
      'x-amz-acl': 'public-read'
    })).req.url

    pub.hsetAsync(`users:${username}:stickers`, emotion, JSON.stringify({
      audio: audioRes,
      video: videoRes
    }))

    pub.publish('stickers:new', JSON.stringify({
      sockets: [username],
      message: {
        emotion,
        audio: audioRes,
        video: videoRes
      }
    }))

    return reply()

  } catch(e) {
    console.log('create sticker error', e)
  }
}