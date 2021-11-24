<template>
	<view>
		<view class="head"></view>
		<view class="content">
			<text class="title">您好，欢迎登录 医孕通</text>
			<view class="form-box">
				<view class="form-content">
					<view class="form">
						<u-form :model="form" label-width="200" ref="uForm">
							<u-form-item label="手机号码:" prop="phone" left-icon="phone-fill" required>
								<u-input v-model="form.phone" placeholder="请输入手机号" />
							</u-form-item>
							<u-form-item label="验证码:" prop="verificationCode" left-icon="email-fill" required>
								<view class="verification-code">
									<u-input v-model="form.verificationCode" placeholder="请输入验证码" />
									<u-verification-code @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
									<u-button hover-class="none" @click="getCode" :custom-style="customVerifCodeStyle">{{verifCodeText}}</u-button>
								</view>
							</u-form-item>
						</u-form>
						<u-button @click="handleTabLoginBtn" hover-class="none" shape="circle" :custom-style="customLoginStyle">登录</u-button>
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
				verifCodeText: '',
				form: {
					phone: '13176008726',
					verificationCode: '0221'
				},
				rules: {
					phone: [{
						required: true,
						message: '请输入手机号'
					}],
					verificationCode: [{
						required: true,
						min: 4,
						message: '请输入验证码'
					}]
				},
				customVerifCodeStyle: {
					width: '220rpx',
					backgroundColor: '#eb89a9',
					color: '#fff'
				},
				customLoginStyle: {
					backgroundColor: '#eb89a9',
					color: '#fff',
					marginTop: '100rpx',
					marginBottom: '40rpx'
				}
			}
		},
		methods: {
			handleTabLoginBtn() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.$u.route({
							url: '/pages/tabbar/hospital/hospital',
							type: 'switchTab'
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			codeChange(text) {
				this.verifCodeText = text;
			},
			getCode() {
				if(!this.$u.test.mobile(this.form.phone))return this.$lz.toast('请输入正确的手机号码!');
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					this.$lz.tipLoading('正在获取验证码');
					setTimeout(() => {
						this.$lz.hideLoading();
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$lz.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$lz.toast('倒计时结束');
			},
			start() {
				this.$lz.toast('倒计时开始');
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		background-color: #eb89a9;
		height: 80rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}

	.content {
		position: relative;
		top: 80rpx;
		background-color: #eb89a9;
		height: 480rpx;
		width: 750rpx;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		z-index: 1;
		.title {
			font-size: 42rpx;
			color: #fff;
			font-weight: 300;
			text-shadow: 0.15em 0.1em 0.2em black;
			padding-left: 40rpx;
		}

		.form-box {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;

			.form-content {
				background-color: #fff;
				width: 94%;
				border-radius: 16rpx;
				box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
				// margin-top: 100rpx;
				position: relative;
				top: 100rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.form {
					width: 94%;
					padding: 20rpx;

					.verification-code {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
</style>
