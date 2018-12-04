<template>
  <div id="message" class="ui hidden fixed menu success message">保存しました</div>
</template>

<script>
export default {
  methods: {
    message() {
      let message = document.getElementById('message')
      message.classList.remove('hidden')
      setTimeout(() => {
        message.classList.add('hidden')
      },1800)
    }
  }
}
</script>

<style>
#message {
  margin-top:43px;
}
</style>


