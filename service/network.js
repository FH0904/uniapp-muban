import config from './config.js'
export default {
	config: {
		baseUrl: config.apiBaseUrl,
		data: {},
		method: "POST",
		dataType: "json",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	// 上传
	uploadFile(api, filePath, data, fileType) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: this.config.baseUrl + api,
				filePath: filePath,
				name: 'file',
				fileType,
				header: {
					'Authorization': ''
				},
				formData: data,
				success: (response) => {
					if (response.statusCode !== 200) {
						return showToast('网络错误，请重试！')
					}
					if (response.statusCode === 200) {
						let result = JSON.parse(response.data)
						// 请求失败的提示或返回
						if (result.code === 400 || result.code === 500) {
							return showToast(result.msg || '网络错误，请重试！')
						}
						// 未登陆的拦截
						// if (result.code === 601) {
						// 	showToast(result.msg || '未登陆')
						// 	uni.removeStorageSync('userToken')
						// 	return uni.redirectTo({
						// 		url: '/pages/login/login',
						// 		animationType: 'slide-in-bottom'
						// 	})
						// }
						// 交换token
						if (result.token) {
							uni.setStorageSync('userToken', result.token)
							delete result.token
						}
						resolve(result);
					} else {
						reject(response);
					}
				},
			});
		});
	},
	request(options) {
		if (!options) {
			options = {}
		}

		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.header = {
			'Content-Type':'application/json;',//'application/x-www-form-urlencoded'
			'Mmhang-Deal-Token': uni.getStorageSync('userToken') || ''
		}

		return new Promise((resolve, reject) => {
			let _config = null;

			// 请求完成
			options.complete = (response) => {
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				if (response.statusCode !== 200) {
					uni.removeStorageSync('userToken')
					return showToast('网络错误，请重试！')
				}
				if (response.statusCode === 200) {
					console.log("Token续约");
					// Token续约
					// if (response.header['Mmhang-Deal-Token'] && response.header['Exchange-Token'] !== '') {
					// 	uni.setStorageSync('userToken', response.header['Mmhang-Deal-Token'])
					// }
					let result = response.data
					// 请求失败的提示或返回
					if ( result.code === 403 || result.code === 500 || result.code === 400 || result.code === -2) {
						if(result.msg !== "")
						showToast(result.msg || '网络错误，请重试！')
						return 
					}
					// 未登陆的拦截
					if (result.code === 601) {
						uni.removeStorageSync('userToken')
						uni.removeStorageSync('userInfo')
						showToast(result.msg || '未登陆')
						// setTimeout(()=>{
						// 	uni.navigateTo({
						// 		url:'/pages/login/wx-login'
						// 	})
						// },2000)
						return
					}
					// 交换token
					// if (result.token) {
					// 	console.log(1);
					// 	uni.setStorageSync('userToken', result.token)
					// 	delete result.token
					// }
					resolve(result);
				} else {
					reject(response);
				}
			}

			// 请求异常
			options.fail = (response) => {
				showToast('网络异常')
			}

			// 加载配置
			_config = Object.assign({}, this.config, options)
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			uni.request(_config);
		}).catch((e)=>{});
	},
}

function showToast(title,icon="none",duration=1500) {
	uni.showToast({
		title,
		icon,
		duration
	})
}
