<template>
  <div>
    <h2>富文本编辑器</h2>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOptions"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)">
    </quill-editor>
    <div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-progress="handlerProgress"
        :before-upload="beforeUpload"
        accept="jpeg,jpg,png">
        <el-button size="small" type="primary" id="uploadBtn">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

import { quillEditor, Quill } from 'vue-quill-editor'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

export default {
  data () {
    return {
      content: '123',
      editorOptions: {
        modules: {
          toolbar: [
            [{'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image']
          ],
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize','Toolbar']
          }
        }
        
      }
    }
  },
  components: {
    quillEditor
  },
  mounted () {
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  methods: {
    onEditorBlur (event) {
      console.log(this.content)
    },
    onEditorFocus (event) {
      
    },
    onEditorReady (event) {
      
    },
    imgHandler (state) {
      let selection = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        let fileBtn = document.getElementById('uploadBtn')
        fileBtn.click()
      }
    },
    handleSuccess (res, file, fileList) {

    },
    handleError (err, file, fileList) {

    },
    handlerProgress (event, file, fileList) {

    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
