<template>
  <div class="main">
    <!-- <h1>拖拽</h1> -->
    <div class="drag-container" @dragenter="dragEnter" @dragover.prevent @drop.prevent="drop">
      <div draggable="true" :disabled="index===2" :id="index" @dragend="dragEnd" @drag="drag" @dragstart="dragStart" class="list-item" v-for="(item, index) in Array(5).fill('hello')" :key="index">
        <span>{{item + index}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      dragObject: null,
      posY: '',
      isUp: null // 判断是上移还是下移， true -上移， false - 下移
    }
  },
  methods: {
    /**
     * 最终位置-起始位置
     */
    dragStart (event) {
      console.log(event.target.getAttribute('disabled') === 'disabled')
      if (event.target.getAttribute('disabled') !== 'disabled') {
        this.dragObject = event.target.id
        this.posY = event.clientY

        event.dataTransfer.setData('dragObj', event.target.id)
        event.target.className += ' dragging'
      } else {
        event.preventDefault();
        
      }
    },
    drag (event) {
    },
    dragEnd (event) {
      event.target.className = event.target.className.replace(/\s?(dragging-hover|dragging)\s?/g, '')
    },
    dragEnter (event) {
      this.isUp = event.clientY > this.posY ? false : true
      this.posY = event.clientY
      let node = document.getElementById(this.dragObject)
      node.className = node.className.indexOf('dragging-hover') !== -1 ? node.className : node.className + ' dragging-hover'
        
      if (event.target.className.indexOf('list-item') !== -1
          && event.target.id !== this.dragObject
          && event.target.getAttribute('disabled') !== 'disabled') {
        this.$nextTick(() => {
          event.target.parentNode.insertBefore(node, this.isUp ? event.target : event.target.nextSibling)
        })
      }
    },
    drop (event) {
      let data = event.dataTransfer.getData('dragObj')
      if (event.target.className.indexOf('drag-container') !== -1) {
      }
    }
  }
}
</script>

<style>
  .drag-container {
    width: 150px;
    border: 1px solid #eee;
  }
  .list-item {
    border: 1px solid #ddd;
    margin: 10px;
    text-align: center;
    padding: 10px 0;
  }
  .list-item:hover {
    cursor: pointer;
  }
  .list-item[disabled] {
    background: grey;
  }
  .list-item[disabled]:hover {
    cursor: not-allowed;
  }
  .dragging {
    background: blue;
    color: #fff;
  }
  .dragging-hover {
    background: yellow;
    color: #000;
  }
</style>

