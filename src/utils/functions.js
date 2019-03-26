export const errorResponse = (response, code, message) => {
  response.status(code).json({ code, message })
}

export const jwtOptions = {
  expiresIn: 3600,
}
