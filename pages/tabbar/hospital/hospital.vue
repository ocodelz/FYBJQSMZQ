<template>
	<view>
		<view class="head-title">桓台县妇幼保健院</view>
		<view class="content">
			<view class="swiper-box">
				<view class="swiper">
					<u-swiper :list="swiper" mode="number" height="240"></u-swiper>
				</view>
			</view>
			<view class="category">
				<view class="category-content">
					<view class="category-item-box" v-for="(item,index) in category" :key="item.id"
						@click="handleTapCategoryItem(item)">
						<view class="category-item" :style="'background-color:' + handleCategoryItemStyle(item.id)">
							<text class="iconfont icon">{{item.icon}}</text>
						</view>
						<text class="name">{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper: ['https://cdn.uviewui.com/uview/swiper/2.jpg'],
				category: [{
						id: '01',
						icon: '\ue6fd',
						name: '医院简介'
					},
					{
						id: '02',
						icon: '\ue61e',
						name: '婚检建档'
					},
					{
						id: '03',
						icon: '\ue60b',
						name: '孕妇建档'
					},
					{
						id: '04',
						icon: '\ue62f',
						name: '婚检报告'
					},
					{
						id: '05',
						icon: '\ue62f',
						name: '孕优报告'
					},
					{
						id: '06',
						icon: '\ue631',
						name: '孕检报告'
					},
					{
						id: '07',
						icon: '\ue8fa',
						name: '母子健康手册'
					},
					{
						id: '08',
						icon: '\ue62f',
						name: '妇幼补助政策'
					}
				]
			}
		},
		computed: {
			// 动态设置分类拦类别背景色
			handleCategoryItemStyle() {
				return function(id) {
					switch (id) {
						case '01':
							return `#3f5ca4;`
							break;
						case '02':
							return `#d66371;`
							break;
						case '03':
							return `#dc6a9d;`
							break;
						case '04':
							return `#5a5da5;`
							break;
						case '05':
							return `#67519e;`
							break;
						case '06':
							return `#5da3aa;`
							break;
						case '07':
							return `#819ea1;`
							break;
						case '08':
							return `#819ea0;`
							break;
					}
				}
			}
		},
		methods: {
			handleTapCategoryItem(item) {
				switch (item.id) {
					case '01':
						this.$lz.toast('点击了' + item.name);
						break;
					case '02':
						this.$u.route('/pages/premaritalInspectionFile/premaritalInspectionFile');
						break;
					case '03':
						this.$u.route('/pages/pregnantWomenFile/pregnantWomenFile');
						break;
					case '04':
						this.$lz.toast('点击了' + item.name);
						break;
					case '05':
						this.$lz.toast('点击了' + item.name);
						break;
					case '06':
						this.$lz.toast('点击了' + item.name);
						break;
					case '07':
						this.$lz.toast('点击了' + item.name);
						break;
					case '08':
						this.$lz.toast('点击了' + item.name);
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head-title {
		background-color: #eb89a9;
		font-size: 32rpx;
		color: #fff;
		font-weight: 400;
		text-shadow: 0.15em 0.1em 0.2em black;
		height: 80rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding-left: 20rpx;
		line-height: 80rpx;
		z-index: 2;
	}

	.content {
		position: relative;
		top: 80rpx;
		background-color: #eb89a9;
		height: 320rpx;
		width: 750rpx;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;

		.swiper-box {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			z-index: 1;
			.swiper {
				width: 90%;
			}
		}

		.category {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;

			.category-content {
				background-color: #fff;
				width: 94%;
				margin-top: 30rpx;
				border-radius: 16rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);

				.category-item-box {
					display: flex;
					align-items: center;
					flex-direction: column;
					padding: 20rpx 0;
					width: 25%;

					.category-item {
						width: 80rpx;
						height: 80rpx;
						border-radius: 100%;
						display: flex;
						align-items: center;
						justify-content: center;

						.icon {
							color: #fff;
						}
					}

					.name {
						font-size: 28rpx;
						margin-top: 8rpx;
					}
				}
			}
		}
	}
</style>
