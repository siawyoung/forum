
import { pub, sub } from '../redis'

import { hash, generateToken, passwordAuthenticate } from '../helpers/hash'

export const register = async (req, reply) => {
  await pub.hmsetAsync(`users:${req.payload.username}`, 'username', req.payload.username, 'password', await hash(req.payload.password))
  return reply()
}

export const login = async (req, reply) => {
  try {
    if (await pub.EXISTS(`users:${req.payload.username}`)) {
      const hash = await pub.hgetAsync(`users:${req.payload.username}`, 'password')
      if (await passwordAuthenticate(req.payload.password, hash)) {
        const token = generateToken(req.payload.username)
        console.log(token)
        reply(token)
      } else {
        console.log('401')
        reply().code(401)
      }
    }
  } catch(e) {
    console.log('e', e)
  }
}
