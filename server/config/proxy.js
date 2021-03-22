const winston = require('winston');
const { createProxyMiddleware } = require('http-proxy-middleware');

const logProvider = (provider) => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
  });

  return {
    log: logger.log.bind(logger),
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
  };
};

const options = {
  target: 'http://127.0.0.1:5001/',
  changeOrigin: true,
  logProvider: logProvider,
};

exports.Proxy = createProxyMiddleware(options);
