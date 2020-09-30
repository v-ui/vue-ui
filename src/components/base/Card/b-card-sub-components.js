import util from '@/components/util/index.js'

const components = {
  'b-card-columns': { class: 'card-columns' },
  'b-card-deck': { class: 'card-deck' },
  'b-card-group': { class: 'card-group' },
  'b-card-text': { el: 'p', class: 'card-text' },
  'b-card-title': { el: 'h5', class: 'card-title' },
  'b-card-subtitle': { el: 'h6', class: 'card-subtitle text-muted' },
  'b-card-img-overlay': {class: 'card-img-overlay'},
}

util.components.initFuncSlotContainer(components)
