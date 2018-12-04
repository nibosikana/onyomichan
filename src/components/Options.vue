<template>
  <div>
    <div class="header">
      <h3 class="ui inverted top fixed teal menu">
        <a class="header item" id='top'>おんヨミちゃん 設定</a>
      </h3>
    </div>
    <div class="main">
      <SimpleReplace></SimpleReplace>
      <RegexpReplace></RegexpReplace>
      <Other></Other>
    </div>
  </div>
</template>

<script>
import 'semantic-ui-css/semantic.min.css';
import SimpleReplace from './SimpleReplace.vue';
import RegexpReplace from './RegexpReplace.vue';
import Other from './Other.vue';

export default {
  components: {
    SimpleReplace,
    RegexpReplace,
    Other
  },
}
</script>

<style>
@font-face {
  font-family: 'Icons';
  src: url("/fonts/icons.woff2") format('woff');
}

.main {
  margin-top: 60px;
}
</style>


