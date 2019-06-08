<template>
  <div class="vh-100">
    <div class="h-100">
      <b-card class="auth-card m-auto">
        <div class="mb-5">
          <img src="images/logo-144.png" alt="logo">
        </div>
        <h1>Register</h1>
        <hr>
        <b-form @submit="signUp" :novalidate="true" :validated="validated" class="needs-validation">
          <b-form-group>
            <b-form-input v-model="username" placeholder="Username" required />
            <b-form-invalid-feedback>Please enter the username</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="password" type="password" placeholder="Password" required />
            <b-form-invalid-feedback>Please enter the password</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <b-button type="submit" block>Sign Up</b-button>
          </b-form-group>
        </b-form>
        <hr>
        <div class="small">
          Have an account?
          <router-link to="/sign-in" >Sign In</router-link>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: null,
    password: null,
    name: 'Guest',
    validated: false
  }),
  methods: {
    signUp(evt) {
      evt.preventDefault()
      let options = {username: this.username, password: this.password}
      this.validated = true
      // validate
      if (!options.username) {
        this.$toasted.show('Username is required!', {
          type: 'error'
        })

        return
      }

      if (!options.password) {
        this.$toasted.show('Password is required!', {
          type: 'error'
        })

        return
      }

      hoodie.account.signUp(options)
        .then(account => {
          console.log(account);
          return hoodie.account.signIn(options)
        })
        .then(account => {
          this.$events.$emit('signed-in', account.username)
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    hoodie.account.get('session').then(session => {
      if (session && (!session.invalid && session.id)) {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
