<template>
	<view v-if="fileInfo.length && tabSwiper.length" >
		<u-tabs-swiper ref="uTabs" :list="tabSwiper" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750" active-color="#e770a4"></u-tabs-swiper>
		<scroll-view scroll-y class="scroll" :scroll-top="scrollTop" @scroll="scrollChange">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper">
				<swiper-item v-for="(item,index) in fileInfo" :key="index">
					<view class="form" v-for="(jtem,jndex) in item.children" :key="jndex">
						<u-form :model="jtem" label-width="140" :label-style="labelStyle">
							<u-form-item :label="jtem.name + ':'" prop="name">
								<view class="input-box" v-if="jtem.type != 'radio' && jtem.type !== '@'">
									<u-input class="input" v-model="jtem.value" :type="jtem.type !== '@' ? jtem.type : ''"
										:placeholder="placeholderText + jtem.name" @click="jtem.type == 'select' ? handleTapInput(jtem,index) : ''"/>
								</view>
								<view v-if="jtem.name == '户籍地址'" class="address">
									<u-switch slot="right" v-model="switchVal" size="40"></u-switch>
									<text>同现地址</text>
								</view>
								<view v-if="jtem.name == '现住址' || jtem.name == '户籍地址'" class="bottom-address">
									<u-input v-model="jtem.value" disabled :placeholder="placeholderText + jtem.name" @click="handleTapInput(jtem,index)"/>
									<u-input v-model="jtem.values" :placeholder="jtem.placeholders"/>
								</view>
								<view class="u-radio-group-box" v-if="jtem.type == 'radio'">
									<u-radio-group v-model="radio">
										<u-radio v-for="(ctem, cndex) in jtem.children" :key="cndex"
											:name="ctem.name" :disabled="ctem.disabled">
											{{ ctem.name }}
										</u-radio>
									</u-radio-group>
								</view>
							</u-form-item>
						</u-form>
					</view>
				</swiper-item>
			</swiper>
		</scroll-view>
		<view class="action-btn">
			<u-button @click="handleSubmitOrNextBtn" hover-class="none" shape="circle" :custom-style="customBtnStyle" :hair-line="false">
				{{btnTextStatus}}
			</u-button>
		</view>
		<u-select label-name="name" value-name="id" v-model="showSelect" :list="select" :title="selectTitle" @confirm="handleSelectConfirm"></u-select>
	</view>
</template>

<script>
	import { fileInfo } from '@/js/common.js';
	import { nation,profession,education,maritalStatus,zjlx } from '@/common/utils.js';
	export default {
		data() {
			return {
				tabSwiper: [{name: '女方信息'}, {name: '男方信息'}],
				fileInfo: [],
				current: 0,
				swiperCurrent: 0,
				scrollTop: 0,
				lastScrollY: 0,
				placeholderText: '妻子',
				btnTextStatus: '下一页',
				switchVal: false,
				customBtnStyle: {
					width: '600rpx',
					backgroundColor: '#e770a4',
					color: '#fff',
					height: '90rpx',
					border: '1rpx solid #e770a4'
				},
				labelStyle: {
					lineHeight: '40rpx'
				},
				showSelect: false,
				select: [],
				selectTitle: '',
				selectIndex: 0
			}
		},
		created() {
			this.handleGetData();
		},
		watch: {
			current: {
				handler(newVal) {
					if (newVal == 0) {
						this.placeholderText = '妻子';
					} else {
						this.placeholderText = '丈夫';
					}
					return newVal == this.fileInfo.length - 1 ? this.btnTextStatus = '提交' : this.btnTextStatus = '下一页';
				},
				deep: true
			}
		},
		methods: {
			handleGetData() {
				let arr = [];
				for (let i = 0; i < this.tabSwiper.length; i++) {
					let obj = {
						id: i+1,
						children: JSON.parse(JSON.stringify(fileInfo[0].children))
					}
					arr.push(obj)
				}
				this.fileInfo = arr;
			},
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
			handleTapInput(data,index){
				switch (data.name){
					case '民族':
						this.select = nation;
						break;
					case '证件类型':
						this.select = zjlx;
						break;
					case '文化程度':
						this.select = education;
						break;
					case '职业':
						this.select = profession;
						break;
				}
				if(data.name !== '户籍地址' && data.name !== '现住址'){
					this.selectTitle = data.name;
					this.showSelect = true;
					this.selectIndex = index;
				}
			},
			handleSelectConfirm(e){
				let item = this.fileInfo[this.selectIndex];
				for(let jtem of item.children){
					if(jtem.name == this.selectTitle){
						jtem.value = e[0].label;
					}
				}
			},
			handleSubmitOrNextBtn() {
				if(this.current == 0){
					this.swiperCurrent ++;
				}else{
					console.log(this.fileInfo);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.scroll {
		height: calc(100vh - 180rpx);
		.swiper{
			height:100vh;
			
			.form {
				padding: 0 40rpx;
			
				.input-box {
					height: 40rpx;
					display: flex;
					align-items: center;
					flex-shrink: 0;
					.input{
						width: 100%;
					}
				}
				
				.u-radio-group-box {
					height: 40rpx;
					display: flex;
					align-items: center;
					flex-shrink: 0;
				}
				.address {
					display: flex;align-items: center;
				}
				.bottom-address{
					display: flex;flex-direction: column;flex-shrink: 0;
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
