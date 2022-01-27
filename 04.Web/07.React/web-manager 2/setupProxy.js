const proxy = require('http-proxy-middleware')

module.exports = function(app) {
	app.use (
		proxy('/auth', {
			target:'http://unilogin.qa.huohua.cn',
			changeOrigin:true,
			pathRewrite:{'^/auth':''}
		}),
		proxy('/logout', {
			target:'http://unilogin.qa.huohua.cn',
			changeOrigin:true,
			pathRewrite:{'^/logout':''}
		}),
	)
}