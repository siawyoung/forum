import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const config = {
  jwtsecret: 'abcde'
}

export const hash = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          return reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  })
}

export const generateToken = (payload) => {
  return jwt.sign(
    payload,
    config.jwtsecret,
    {
      expiresIn: 10080
    }
  )
}

export const passwordAuthenticate = (password, hash) => {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, hash, function(err, res) {
      if (err) {
        return reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export const verifyToken = (req) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']
  if (!authHeader) {
    return null
  }
  return jwt.verify(authHeader.replace('Bearer ', ''), config.jwtsecret)
}