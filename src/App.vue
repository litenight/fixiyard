<template>
  <div :class="isLoggedIn ? 'h-100' : 'auth'">
    <!-- b-navbar sticky toggleable="sm" type="dark" variant="secondary" v-if="isLoggedIn">
      <b-container>
        <b-navbar-brand to="/">Fixiyard</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <li v-for="(link, index) in links" :key="index" class="nav-item">
              <router-link :to="link.to" class="nav-link">{{ link.name }}</router-link>
            </li>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template slot="button-content"></template>
              <b-dropdown-item to="/profile">{{ username }}</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item href="#" @click.prevent="signOut">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar -->

    <div :class="(isLoggedIn ? 'row no-gutters wrapper' : 'h-100')">
      <b-col md="2" v-if="isLoggedIn" class="sidebar">
        <nav class="dark">
          <b-row class="no-gutters">
            <b-col v-for="(link, index) in links" :key="index" cols="3" md="12">
              <div class="nav-item my-4">
                <router-link :to="link.to" class="nav-link">
                  <i class="mic">{{link.icon}}</i>
                  <span class="d-none d-md-block">{{ link.name }}</span>
                </router-link>
              </div>
            </b-col>
          </b-row>
        </nav>
      </b-col>
      <div :class="{'col-md-10': isLoggedIn}">
        <main>
          <b-container fluid>
            <router-view/>
          </b-container>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        name: 'Home',
        to: '/',
        icon: 'home'
      },
      {
        name: 'Customers',
        to: '/customers',
        icon: 'group'
      },
      // {
      //   name: 'New Job',
      //   to: '/jobs/add',
      //   icon: 'home'
      // },
      {
        name: 'Profile',
        to: '/profile',
        icon: 'face'
      },
      {
        name: 'Settings',
        to: '/settings',
        icon: 'settings'
      }
    ],
    isLoggedIn: false,
    username: 'Guest'
  }),
  watch: {
    isLoggedIn: (status) => {
      document.body.classList.toggle('user', status)
      document.body.classList.toggle('guest', !status)
    }
  },
  methods: {
    signedIn(username) {
      this.isLoggedIn = true
      this.username = username
    },
    showSignIn() {
      this.$router.push('/sign-in')
    },
    showSignUp() {
      this.$router.push('/sign-up')
    },
    showHome() {
      this.$router.push('/')
    },
    signOut() {
      hoodie.account.signOut().then(() => {
        this.isLoggedIn = false
        location.href = location.origin
      })
    }
  },
  created() {
    hoodie.account.get('session').then(session => {
      if (!session || session.invalid) {
        this.showSignIn()
      } else {
        hoodie.account.get('username').then(username => {
          console.log(username);
          this.signedIn(username)
        }).catch(this.showSignIn)
        this.showHome()
      }
    })
    this.$events.$on('signed-in', this.signedIn)
  }
}
</script>

<style lang="scss" scoped>
</style>
