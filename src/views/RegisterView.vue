<script setup>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
</script>
<template>
    <div class="container">
      <form @submit.prevent="register">
        <input type='email' name='email' placeholder='Email' required />
        <input type='password' name='password' placeholder='Lösenord' required minLength='6' maxLength='100' />
        <button type='submit'>Skapa konto</button>
      </form>
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
    register(e) {
      this.authMsg = '';
      createUserWithEmailAndPassword(this.auth, e.target['email'].value, e.target['password'].value)
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
            .then(resp => this.$router.push('/'))
            .catch(err => this.authMsg = 'Något gick fel, kunde inte logga in.');
        }).catch(err => this.authMsg = 'Felaktigt email eller lösenord!');
    }
  }
}
</script>

  
  <style>
  
  </style>