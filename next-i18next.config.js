const path = require('path')

module.exports = {
    i18n: {
        locales: ['en-US', 'ar-KW'],
        defaultLocale: 'en-US',
        localePath: path.resolve('./public/locales')
    },
}