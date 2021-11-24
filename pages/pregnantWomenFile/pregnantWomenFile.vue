<template>
	<view v-if="list.length && tabSwiper.length">
		<u-tabs-swiper ref="uTabs" :list="tabSwiper" :current="current" @change="tabsChange" :is-scroll="false"
			swiperWidth="750" active-color="#e770a4"></u-tabs-swiper>
		<scroll-view scroll-y class="scroll" :scroll-top="scrollTop" @scroll="scrollChange">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper">
				<swiper-item v-for="(item,index) in list" :key="index"
					:style="index == 2 ? 'display: flex;flex-wrap: wrap;align-content: flex-start;' : ''">
					<view class="form" v-for="(jtem,jndex) in item.children" :key="jndex"
						:style="'width:' + handleStyleInputStyle(jtem)">
						<view class="form-name" :style="jtem.name !== '/' && jtem.name !=='经期' ? 'width:140rpx;' : ''">
							<text>{{jtem.name}}</text>
							<text v-if="jtem.required" class="required">*</text>
							<text v-if="jtem.name !== '/'">:</text>
						</view>
						<view class="form-item" v-if="jtem.name == '末次月经'">
							<u-checkbox-group>
								<u-checkbox v-model="yjChecked">不确定</u-checkbox>
							</u-checkbox-group>
						</view>
						<view class="form-item" v-if="jtem.type != 'radio' && jtem.type !== 'textarea'"
							:style="'width:' + handleStyleInputStyle(jtem)">
							<u-input class="input" v-model="jtem.value" :type="jtem.type"
								:placeholder="jtem.placeholder" v-if="jtem.name !== '末次月经'" />
							<u-input class="input" v-model="jtem.value" :type="jtem.type"
								v-if="yjChecked == false && jtem.name == '末次月经'" :placeholder="jtem.placeholder" />
						</view>
						<view class="form-item" v-if="jtem.type == 'radio'">
							<u-radio-group v-model="radio">
								<u-radio v-for="(ctem, cndex) in jtem.children" :key="cndex" :name="ctem.name"
									:disabled="ctem.disabled">
									{{ ctem.name }}
								</u-radio>
							</u-radio-group>
						</view>
						<view v-if="jtem.type == 'textarea'" class="bottom-address">
							<view v-if="(jtem.name == '户籍地址' || jtem.name == '休养地') && jtem.state" class="address">
								<u-switch slot="right" v-model="jtem.isSwitch" size="30" active-color="#e770a4">
								</u-switch>
								<text style="padding-left: 20rpx;">同现地址</text>
							</view>
							<view v-if="jtem.isSwitch == false">
								<u-input v-model="jtem.value" disabled :placeholder="jtem.placeholder" />
								<u-input v-model="jtem.values" :placeholder="jtem.placeholders" :type="jtem.type"
									height="35" />
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</scroll-view>
		<view class="action-btn">
			<u-button @click="handleSubmitOrNextBtn" hover-class="none" shape="circle" :custom-style="customBtnStyle"
				:hair-line="false">
				{{btnTextStatus}}
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yjChecked: true,
				tabSwiper: [{
					name: '基本信息'
				}, {
					name: '丈夫信息'
				}, {
					name: '健康信息'
				}, {
					name: '疾病史'
				}],
				current: 0,
				swiperCurrent: 0,
				scrollTop: 0,
				lastScrollY: 0,
				btnTextStatus: '下一页',
				placeholderText: '请输入',
				list: [{
						children: [{
								name: '证件类型',
								type: 'select',
								required: true,
								value: '',
								placeholder: '请选择证件类型'
							},
							{
								name: '证件号码',
								type: 'input',
								required: true,
								value: '',
								placeholder: '请输入证件号码'
							},
							{
								name: '孕妇姓名',
								type: 'input',
								required: true,
								value: '',
								placeholder: '请输入孕妇姓名'
							},
							{
								name: '出生日期',
								type: 'select',
								required: true,
								value: '',
								placeholder: '请选择出生日期'
							},
							{
								name: '手机号',
								type: 'input',
								required: true,
								value: '',
								placeholder: '请输入手机号'
							},
							{
								name: '民族',
								type: 'select',
								required: false,
								value: '',
								placeholder: '请选择民族'
							},
							{
								name: '文化程度',
								type: 'select',
								required: false,
								value: '',
								placeholder: '请选择文化程度'
							},
							{
								name: '职业',
								type: 'select',
								required: false,
								value: '',
								placeholder: '请选择职业'
							},
							{
								name: '工作单位',
								type: 'input',
								required: false,
								value: '',
								placeholder: '请输入工作单位'
							},
							{
								name: '户口性质',
								type: 'radio',
								required: true,
								children: [{
										name: '城镇',
										disabled: false
									},
									{
										name: '乡村',
										disabled: false
									}
								]
							},
							{
								name: '现住址',
								type: 'textarea',
								required: true,
								value: '',
								values: '',
								placeholder: '点击选择省/市/区/县/乡镇',
								placeholders: '详细地址（街道、小区、门牌号）',
								isSwitch: false
							},
							{
								name: '户籍地址',
								type: 'textarea',
								required: true,
								value: '',
								values: '',
								placeholder: '点击选择省/市/区/县/乡镇',
								placeholders: '详细地址（街道、小区、门牌号）',
								isSwitch: true,
								state: true
							},
							{
								name: '休养地',
								type: 'textarea',
								required: true,
								value: '',
								values: '',
								isSwitch: true,
								state: true,
								placeholder: '点击选择省/市/区/县/乡镇',
								placeholders: '详细地址（街道、小区、门牌号）',
							}
						]
					},
					{
						children: [{
								name: '证件类型',
								type: 'select',
								required: false,
								value: '',
								placeholder: '请选择丈夫证件类型'
							},
							{
								name: '证件号码',
								type: 'input',
								required: false,
								value: '',
								placeholder: '请输入丈夫证件号码'
							},
							{
								name: '丈夫姓名',
								type: 'input',
								required: true,
								value: '',
								placeholder: '请输入丈夫姓名'
							},
							{
								name: '年龄',
								type: 'input',
								required: false,
								value: '',
								placeholder: '请输入丈夫年龄'
							},
							{
								name: '手机号',
								type: 'input',
								required: true,
								value: '',
								placeholder: '请输入丈夫手机号'
							},
							{
								name: '户籍地址',
								type: 'textarea',
								required: true,
								value: '',
								values: '',
								placeholder: '点击选择省/市/区/县/乡镇',
								placeholders: '详细地址（街道、小区、门牌号）',
								isSwitch: false,
								state: false
							},
							{
								name: '民族',
								type: 'select',
								required: false,
								value: '',
								placeholder: '请选择丈夫民族'
							},
							{
								name: '文化程度',
								type: 'select',
								required: false,
								value: '',
								placeholder: '请选择丈夫文化程度'
							},
							{
								name: '职业',
								type: 'select',
								required: false,
								value: '',
								placeholder: '请选择丈夫职业'
							},
							{
								name: '工作单位',
								type: 'input',
								required: false,
								value: '',
								placeholder: '请输入丈夫工作单位'
							}
						]
					},
					{
						children: [{
								name: '末次月经',
								type: 'select',
								required: true,
								value: '',
								placeholder: '请选择末次月经'
							},
							{
								name: '预产期',
								type: 'select',
								required: true,
								value: '',
								placeholder: '请选择预产期'
							},
							{
								name: '月经周期',
								type: 'input',
								required: true,
								value: '',
								placeholder: '月经周期'
							},
							{
								name: '经期',
								type: 'input',
								required: false,
								value: '',
								placeholder: '月经经期'
							},
							{
								name: '确诊方法',
								type: 'select',
								required: true,
								value: '',
								placeholder: '妊娠确诊方法'
							},
							{
								name: '怀孕次数',
								type: 'input',
								required: true,
								value: '',
								placeholder: '怀孕次数'
							},
							{
								name: '流产次数',
								type: 'input',
								required: true,
								value: '',
								placeholder: '流产次数'
							},
							{
								name: '孕前血压',
								type: 'input',
								required: true,
								value: '',
								placeholder: '收缩压(高压)'
							},
							{
								name: '/',
								type: 'input',
								required: false,
								value: '',
								placeholder: '舒张压(低压)'
							},
							{
								name: '孕前体重',
								type: 'input',
								required: true,
								value: '',
								placeholder: '孕前体重（Kg）'
							},
							{
								name: '身高',
								type: 'input',
								required: true,
								value: '',
								placeholder: '请输入身高（单位：厘米）'
							},
							{
								name: '当前血压',
								type: 'input',
								required: true,
								value: '',
								placeholder: '收缩压(高压)'
							},
							{
								name: '/',
								type: 'input',
								required: false,
								value: '',
								placeholder: '舒张压(低压)'
							},
							{
								name: '当前体重',
								type: 'input',
								required: true,
								value: '',
								placeholder: '当前体重（单位：千克）'
							}
						]
					},
					{
						children: [{
								name: '家族史',
								type: 'select',
								required: false,
								value: '',
							},
							{
								name: '既往病史',
								type: 'select',
								required: false,
								value: ''
							},
							{
								name: '个人史',
								type: 'select',
								required: false,
								value: ''
							},
							{
								name: '异常情况',
								type: 'select',
								required: false,
								value: ''
							},
							{
								name: '妇科手术',
								type: 'input',
								required: false,
								value: '',
								placeholder: '请输入妇科手术史'
							}
						]
					}
				],
				customBtnStyle: {
					width: '600rpx',
					backgroundColor: '#e770a4',
					color: '#fff',
					height: '90rpx',
					border: '1rpx solid #e770a4'
				}
			}
		},
		watch: {
			current: {
				handler(newVal) {
					return newVal == this.list.length - 1 ? this.btnTextStatus = '提交' : this.btnTextStatus = '下一页';
				},
				deep: true
			}
		},
		computed: {
			handleStyleInputStyle() {
				return function(item) {
					if (item.name == '月经周期' || item.name == '经期' || item.name == '孕前血压' || item.name == '/' || item
						.name == '当前血压') {
						return `50%;`
					} else {
						return `100%;`
					}
				}
			}
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.scrollTop = this.lastScrollY;
				this.$nextTick(() => {
					this.scrollTop = 0;
				})
			},
			scrollChange(e) {
				this.lastScrollY = e.detail.scrollTop;
			},
			handleSubmitOrNextBtn() {
				console.log(this.list.length - 1);
				if (this.current < this.list.length - 1) {
					this.swiperCurrent++;
				} else {
					console.log(this.list);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.scroll {
		height: calc(100vh - 180rpx);

		.swiper {
			height: 100vh;

			.form {
				margin-top: 10rpx;
				padding: 0 20rpx;
				display: flex;
				align-items: center;

				.form-name {
					.required {
						color: #f00;
					}
				}

				.form-item {
					background-color: #f8f8f8;
					border-radius: 8rpx;
					height: 70rpx;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					padding: 0 10rpx;
					flex: 1;
				
					.input {
						width: 100%;
					}
				}

				.u-radio-group-box {
					height: 40rpx;
					display: flex;
					align-items: center;
					flex-shrink: 0;
				}

				.bottom-address {
					display: flex;
					flex-direction: column;
					flex-shrink: 0;
					background-color: #f8f8f8;
					flex: 1;
					padding: 0 10rpx;
					border-radius: 8rpx;
				}

				.address {
					display: flex;
					align-items: center;
					height: 70rpx;
				}
			}
		}
	}

	.action-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
