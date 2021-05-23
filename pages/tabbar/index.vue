<template>
	<view>
	<u-grid :col="3" :border="false">
		<u-grid-item>
			<u-icon name="photo" :size="46"></u-icon>
			<view class="grid-text">图片</view>
		</u-grid-item>
		<u-grid-item>
			<u-icon name="lock" :size="46"></u-icon>
			<view class="grid-text">锁头</view>
		</u-grid-item>
		<u-grid-item>
			<u-icon name="hourglass" :size="46"></u-icon>
			<view class="grid-text">沙漏</view>
		</u-grid-item>
	</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		 onShow(){
		    this.setTabBarIndex(0)//index为当前tab的索引
		  }
	}
</script>

<style lang="scss"> 
.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
}

</style>
