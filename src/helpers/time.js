export const timestamp = () => {
  const time = process.hrtime()
  return (time[0] * 1000000 + time[1] / 1000)
}