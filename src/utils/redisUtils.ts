import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const redis = new Redis();
// Initialize store.
const sessionRedisStore = new RedisStore({
  client: redis,
  prefix: 'timeline_session:',
});


async function deleteUserSession(sessionID: string) {
  const response = await sessionRedisStore.destroy(sessionID);
  return response;
}

export {
  sessionRedisStore,
  deleteUserSession
}