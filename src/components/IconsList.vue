<template>
  <div class="icons-wrapper">
    <template
      v-for="(iconName, index) in iconList">
      <i :class="[iconName.name, {'active-icon': iconName.isSelected}]" :id="iconName.name" :index="index" :key="index" @click="handleSelected"></i>
    </template>
  </div>
</template>

<script>
import {icons} from '@/common/icons.js'

export default {
  data () {
    return {
      iconList: this.init(icons),
    }
  },
  methods: {
    init(data) {
      return data.map(item => {
        if (typeof item === 'object') {
          item.isSelected = false
          return item
        } else {
          let obj = {}
          obj.name = item
          obj.isSelected = false
          return obj
        }
      })
    },
    handleSelected (e) {
      this.init(this.iconList)
      let index = e.target.getAttribute('index')
      this.iconList[index].isSelected = true
      this.$emit('data', e.target.id)
    }
  }
}
</script>

<style scoped>
  .icons-wrapper i{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
  }
  
  .icons-wrapper i:hover, i.active-icon {
    cursor: pointer;
    /* background: blue; */
  }

@keyframes autoScale {
  0%   {transform: scale(1)}
  100% {transform: scale(1.2)} 
}
  .icons-wrapper i:hover {
    border: 1px solid #f5f5f5;
    animation: autoScale .1s;
    animation-fill-mode: forwards;
  }
</style>
