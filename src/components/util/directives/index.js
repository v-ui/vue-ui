import Vue from 'vue'
// directives
// 通用指令

// v-tip
// 注册一个全局自定义指令 `v-tip`(用于提示弹窗)
import tip from './tip'
Vue.directive(tip.name, tip.func) // v-tip

// v-modal
// 注册一个全局自定义指令 `v-modal`(用于模态弹窗， 与 v-model 不同)
import modal from './modal'
Vue.directive(modal.name, modal.func) // v-modal

// v-lazy
// 延迟调用 在元素进入/快进入可是范围时执行回调函数
// 常用于图片等数据的延迟加载
import lazy from './lazy'
Vue.directive(lazy.name, lazy.func) // v-lazy

export default {}
