
import knox from 'knox'
const env = require('../env')

export const client = knox.createClient({
  key: env.aws.key,
  secret: env.aws.secret,
  bucket: 'sy-forum-1'
})