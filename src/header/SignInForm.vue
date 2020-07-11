<template>
  <form id="sign-in-form" autocomplete="off">
    <h2>Sign In</h2>
    <div class="form-element">
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" v-model="email" />
    </div>
    <div class="form-element">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" v-model="password" />
    </div>
    <div id="sign-in-submit-container">
      <button id="sign-in-submit-button" @click="handleSubmit">
        <div class="lds-dual-ring" v-if="isSubmitting"></div>
        <span v-else>Submit</span>
      </button>
    </div>
    <div v-if="showMessage" id="sign-in-message">
      <span>
        <b>ERROR: Invalid email or password</b>
      </span>
    </div>
  </form>
</template>

<script>
import { bus } from '@/main';

export default {
  name: 'SignInForm',
  data() {
    return {
      email: '',
      password: '',
      isSubmitting: false,
      showMessage: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.showMessage = false;
      let stop = false;
      const emailInput = document.querySelector('#email');
      const passwordInput = document.querySelector('#password');
      if (!this.email) {
        stop = true;
        emailInput.classList.add('red-border');
      } else {
        emailInput.classList.remove('red-border');
      }
      if (!this.password) {
        stop = true;
        passwordInput.classList.add('red-border');
      } else {
        passwordInput.classList.remove('red-border');
      }
      if (stop) {
        return;
      }
      this.setIsSubmitting();
      const user = {
        email: this.email,
        password: this.password,
      };
      bus.$emit('attemptUserSignIn', user);
    },
    setIsSubmitting() {
      this.isSubmitting = true;
      document.querySelector('#email').disabled = true;
      document.querySelector('#password').disabled = true;
      document.querySelector('#sign-in-submit-button').disabled = true;
    },
    resetForm() {
      this.isSubmitting = false;
      this.email = '';
      this.password = '';
      document.querySelector('#email').disabled = false;
      document.querySelector('#password').disabled = false;
      document.querySelector('#sign-in-submit-button').disabled = false;
    },
    handleSignInError() {
      this.isSubmitting = false;
      this.showMessage = true;
      document.querySelector('#email').disabled = false;
      document.querySelector('#password').disabled = false;
      document.querySelector('#sign-in-submit-button').disabled = false;
    },
  },
  mounted() {
    bus.$on('signInError', this.handleSignInError);
    bus.$on('signInSuccess', this.resetForm);
  },
};
</script>

<style lang='scss'>
#sign-in-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .form-element {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    label {
      font-size: 24px;
    }

    input[type="text"],
    input[type="password"] {
      padding: 6px;
      border: 2px solid $primary;
      border-radius: 4px;
      width: calc(100% - 8px);
      font-size: 20px;

      &:focus {
        border: 2px solid $primary;
      }
    }

    .red-border {
      border: 2px solid #b94242 !important;
    }
  }

  #sign-in-submit-container {
    align-self: flex-end;

    button {
      padding: 8px;
      border-radius: 4px;

      &:hover {
        cursor: pointer;
      }

      span {
        padding: 7px 0;
      }

      .lds-dual-ring {
        display: inline-block;
      }

      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 20px;
        height: 20px;
        margin: 8px;
        border-radius: 50%;
        border: 3px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
      }
      @keyframes lds-dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
  #sign-in-message {
    align-self: flex-end;
    margin-top: 8px;
  }
}
</style>
