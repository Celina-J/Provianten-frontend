<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
</script>

<template>
  <div class="body-overlay">
    <div class="login-register-box">
      <form @submit.prevent="login">
        <label>Email</label>
        <input class="my-2 form-control" type='email' name='email' placeholder='Email' required />
        <label>Password</label>
        <input class="my-2 form-control" type='password' name='password' placeholder='Lösenord' required minLength='6' maxLength='100' />
        <div class="my-1 error-msg">{{ authMsg }}</div>
        <button class="my-1 btn btn-secondary" type='submit'>Logga in</button>
        <div class="my-1">- eller -</div>
        <RouterLink class="my-1 login-link" to="/register">Skapa konto</RouterLink>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: getAuth(),
      authMsg: ''
    }
  },
  methods: {
    login(e) {
      this.authMsg = '';

      //Firebase auth login
      signInWithEmailAndPassword(this.auth, e.target['email'].value, e.target['password'].value)
        .then(user => {
          fetch('http://localhost:5000/api/sessionlogin', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: user._tokenResponse.idToken
            })
          })
            .then(resp => resp.json())
            .then(resp => {
              document.cookie = 'session=' + resp.session;
              this.$router.push('/');
            })
            .catch(err => this.authMsg = 'Något gick fel, kunde inte logga in.');
        }).catch(err => this.authMsg = 'Felaktigt email eller lösenord!');
    }
  }
}
</script>

<style scoped>
  .login-register-box{
    margin: auto;
    position: relative;
    top: 20%;
    background-color: white;
    border-radius: 1em;
    max-width: 400px;
    padding: 2em;
    text-align: center;
  }
  
  .login-link{
    color: #222;
    text-decoration: none;
  }
  .error-msg{
    color: red;
  }
</style>
