import Vue from 'vue'
import BaseComponent from 'src/components/component'

describe('component.vue', () => {
  it('should have correct data props', () => {
    const Constructor = Vue.extend(BaseComponent)
    const vm = new Constructor().$mount()
    expect(vm.$data.name)
      .to.equal('Name')
  })
})
