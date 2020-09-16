// v-lazy
// 延迟调用 在元素进入/快进入可是范围时执行回调函数
// 常用于图片等数据的延迟加载
const name = 'lazy'
const func = (el, binding) => {
  let cellback = binding.value.cellback || binding.value
  let option = Object.assign({ root: null, rootMargin: '50px', threshold: 0, }, binding.value.option || {})
  let initObserver = new IntersectionObserver(changes => {
    changes.forEach(element => {
      // 当这个值大于 0，说明满足我们的加载条件了，这个值可通过 rootMargin 手动设置
      if (element.intersectionRatio > 0) {
        // 放弃监听，防止性能浪费，并加载图片。
        initObserver.unobserve(element.target)
        cellback && cellback()
      }
    })
  }, option)
  initObserver.observe(el)
}

export default {
  name,
  func,
}
