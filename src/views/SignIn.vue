<template>
  <div class="vh-100">
      <b-row class="h-100">
        <b-col md="6" offset-md="3" lg="4" offset-lg="4" class="my-auto">
          <b-card>
            <h1>Login</h1>
            <hr>
            <b-form @submit="signIn" :novalidate="true" :validated="validated" class="needs-validation">
              <b-form-group>
                <b-form-input v-model="username" placeholder="Username" required />
                <b-form-invalid-feedback>Please enter the username</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input v-model="password" placeholder="Password" type="password" required />
                <b-form-invalid-feedback>Please enter the password</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-button type="submit" >Sign In</b-button>
              </b-form-group>

              <hr>

              <div class="small">
                Don't have an account?
                <router-link to="/sign-up" >Sign Up</router-link>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: null,
    password: null,
    validated: false
  }),
  computed: {
  },
  methods: {
    signIn(evt) {
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

      hoodie.account.signIn(options)
        .then(account => {
          this.$events.$emit('signed-in', account.username)
          this.$router.push('/')
        })
        .catch(error => {
          this.$toasted.show(error.message, {
            type: 'error'
          })
        })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
