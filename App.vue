<script>
	export default {
		onLaunch: function() {
			// 小程序版本更新
			// #ifdef MP-WEIXIN
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
									}
								}
							})
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							wx.showModal({
								title: '更新失败',
								content: '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
									}
								}
							})
						});
					}
				});
			}
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	
	page {
		background-color: #f5f5f5;
	}
	/**div显示固定行数**/
	.only-line-2{
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    line-clamp: 2;
	    -webkit-box-orient: vertical;
	    text-overflow: -o-ellipsis-lastline;
	}
	.only-line-1{
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    line-clamp: 1;
	    -webkit-box-orient: vertical;
	    text-overflow: -o-ellipsis-lastline;
	}
	.only-line-3{
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 3;
	    line-clamp: 3;
	    -webkit-box-orient: vertical;
	    text-overflow: -o-ellipsis-lastline;
	}
</style>
