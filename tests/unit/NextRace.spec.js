import { mount } from '@vue/test-utils'
import NextRace from '@/components/NextRace.vue'
import json from '../../public/test.json';


describe('NextRace.vue', () => {
  it('new input data should populate the widget', () => {
    const wrapper = mount(NextRace, {
      data() {
        return {
          checkedTypes: ["G","T","J","D"],
          races: json, 
        }
      }
    })
    expect(wrapper.vm.showRace.length).toBe(1)
  })
})
