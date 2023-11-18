export const config = {
  env: process.env.ENV || 'local',
  baseUrl: process.env.BASE_URL || 'http://localhost:8080/',
  port: process.env.HTTP_PORT || process.env.PORT,
  jwtSecret: process.env.JWT_SECRET as string,
};
