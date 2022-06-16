<template>
  <div class="container">
    <div class="form">
      <h1 class="form__title">Login</h1>
      <div class="form__message form__message--error"></div>
      <div class="form__input-group">
        <input type="text" class="form__input" autofocus placeholder="Username or email" v-model="username">
        <div class="form__input-error-message"></div>
      </div>
      <div class="form__input-group">
        <input type="password" class="form__input" autofocus placeholder="Password" v-model="password">
        <div class="form__input-error-message"></div>
      </div>
      <button class="form__button" @click="login">Continue</button>
      <p class="form__text">
        <router-link :to="{name: 'register'}" class="form__link">
          Don't have an account? Create account
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RestApi from "@/libs/rest-api";
import Cookies from "js-cookie";

@Component({
  components: {}
})
export default class LoginView extends Vue {

  private username: string = "";
  private password: string = "";

  private async login() {
    try {
      const data = (await RestApi.post<{token: string}>('/auth', {
        usernameOrEmail: this.username,
        password: this.password
      })).data;
      Cookies.set("pits_access_token", data.token);
      await this.$router.push({name: 'main'});
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
