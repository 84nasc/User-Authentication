import { verify } from 'jsonwebtoken';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'User not authorizated!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, 'myToken');

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Invalid Jwt Token' });
  }
};
