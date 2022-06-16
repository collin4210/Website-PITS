<template>
  <div class="hello">
    <span>Hallo, <b>{{username}}</b></span>

    <img src="@/assets/logo.png">
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { State } from "vuex-class";

@Component({
  components: {}
})
export default class MainView extends Vue {

  @State("username")
  private username!: string;
}
</script>

<style scoped lang="scss">
.hello {
  display: flex;
  flex-direction: column;
}
</style>
