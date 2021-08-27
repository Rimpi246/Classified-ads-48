// Configuration

const consts = {
    APIHost : {
        'production': '',
        'development': 'https://dzlistings.herokuapp.com',
        'local': 'http://localhost:3000',
    },
    OUTLOOK: {
        // Office 365 server
        MAIL_SERVER: 'smtp.office365.com',
        // secure SMTP
        SMTP_PORT: '587',
        TLS: {ciphers: 'SSLv3'}
    },
    PING_LIMITER: {
        RATE_LIMIT: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 5, // limit each IP to 100 requests per windowMs
          },
        SLOW_DOWN_LIMIT: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            delayAfter: 100, // allow 100 requests per 15 minutes, then...
            delayMs: 500, // begin adding 500ms of delay per request above 100:
            // request # 101 is delayed by  500ms
          }
    }
};
module.exports = consts;