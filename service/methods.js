import http from './network.js'

// 登录
// const login = (data) => {
// 	return http.request({
// 		url: 'app/customer/login',
// 		dataType: 'json',
// 		method: 'POST',
// 		data
// 	})
// }
// 文件上传接口
const uploadPicture = (filePath, data = {}, fileType = 'image') => {
	return http.uploadFile('app/customer/storage/uploadPicture', filePath, data, fileType)
}

		
export default {
	uploadPicture
}