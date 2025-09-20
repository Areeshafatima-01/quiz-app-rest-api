import {rateLimit} from 'express-rate-limit';
const apiRateLimit = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, 
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	
})
export  {apiRateLimit};