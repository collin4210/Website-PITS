<template>
  <div class="container">
    <div class="form">
      <h1 class="form__title">Create Account</h1>
      <div class="form__message form__message--error"></div>
      <div class="form__input-group">
        <input type="text" id="signupUsername" class="form__input" autofocus placeholder="Username" v-model="username">
        <div class="form__input-error-message"></div>
      </div>
      <div class="form__input-group">
        <input type="text" class="form__input" autofocus placeholder="Email Address" v-model="email">
        <div class="form__input-error-message"></div>
      </div>
      <div class="form__input-group">
        <input type="password" class="form__input" autofocus placeholder="Password" v-model="password">
        <div class="form__input-error-message"></div>
      </div>
      <div class="form__input-group">
        <input type="password" class="form__input" autofocus placeholder="Confirm password" v-model="confirmPassword">
        <div class="form__input-error-message" v-if="confirmPasswordError">{{confirmPasswordError}}</div>
      </div>
      <button class="form__button" @click="register">Continue</button>
      <p class="form__text">
        <router-link :to="{name: 'login'}" class="form__link">
          Already have an account? Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RestApi from "@/libs/rest-api";

@Component({
  components: {}
})
export default class RegisterView extends Vue {

  private username: string = "";
  private email: string = "";
  private password: string = "";
  private confirmPassword: string = "";

  private confirmPasswordError: string = "";

  private async register() {
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = "Passwords do not match";
      return;
    }
    try {
      const data = (await RestApi.post<{username: string; email: string}>("/user", {
        username: this.username,
        email: this.email,
        password: this.password
      })).data;
      if (data) {
        await this.$router.push({name: 'login'});
      }
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
