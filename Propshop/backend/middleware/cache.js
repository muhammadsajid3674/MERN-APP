import { clearHash } from '../util/cache.js';

const clearCache = async (req, res, next) => {
    await next();
    clearHash(req.user?.id)
}

export { clearCache } 