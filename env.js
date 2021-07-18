;(function(){
	let env_vars = undefined
	if("development" === process.env.NODE_ENV) {
		env_vars = require('./env.dev.js')
	} else if('production' === process.env.NODE_ENV) {
		env_vars = require('./env.prod.js')
	}
	console.log(env_vars , 'env_vars ');
	if(env_vars) {
		process.uni_env = env_vars
	}
}());