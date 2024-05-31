<template>
    <div class="phtotIndex2" :style="{ height:$mainStore.state.boshland.boContainerHeight + 'px' }">
      123
    </div>
</template>
<script setup>
import {defineComponent} from "vue";

defineComponent({
  name: 'photoIndex'
})
</script>
<style scoped>

.phtotIndex2{
  width: 100%;
  background-image: url('./index2.png');
  background-size: cover;
  background-repeat: no-repeat;

}
</style>
