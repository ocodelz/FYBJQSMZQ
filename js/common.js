import {maritalStatus} from '../common/utils.js';
const fileInfo = [
	{
		children: [
		{
			name: '证件类型',
			value: '居民身份证',
			type: 'select'
		},
		{
			name: '证件号码',
			value: '',
			type: 'input'
		},
		{
			name: '姓名',
			value: '',
			type: 'input'
		},
		{
			name: '出生日期',
			value: '',
			type: 'input'
		},
		{
			name: '联系电话',
			value: '',
			type: 'input'
		},
		{
			name: '婚姻状况',
			children: maritalStatus,
			type: 'radio'
		},
		{
			name: '民族',
			value: '',
			type: 'select'
		},
		{
			name: '文化程度',
			value: '',
			type: 'select'
		},
		{
			name: '职业',
			value: '',
			type: 'select',
			
		},
		{
			name: '工作单位',
			value: '',
			type: 'input',
		},
		{
			name: '现住址',
			type: '@',
			value: '',
			values: '',
			placeholders: '详细地址（街道、小区、门牌号）'
		},
		{
			name: '户籍地址',
			type: '@',
			value: '',
			values: '',
			placeholders: '详细地址（街道、小区、门牌号）'
		}
	]
	}
]
export {
	fileInfo
}