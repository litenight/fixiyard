<template>
  <div>
    <b-row>
      <b-col cols="8">
        <h1>Latest Jobs</h1>
      </b-col>
      <b-col cols="4" class="text-right">
        <overlay-trigger css-class="btn-sm btn-success" target="job-overlay">
          <span class="mic">add</span>
          <span class="d-none d-md-inline">New Job</span>
        </overlay-trigger>
      </b-col>
    </b-row>

    <hr>

    <div class="jobs mt-md-5">
      <b-row class="job mb-4 pb-4" v-for="job in jobs" :key="job.id">
        <b-col md="6" lg="3">
          <div class="user mb-3">
            <div class="avatar">
              <div class="initials" :style="'background-color: ' + getColor(getInitials(job.customer))">{{ getInitials(job.customer) }}</div>
            </div>
            <div class="details">
              <h6 class="name">{{ job.customer }}</h6>
              <div class="phone">{{ job.phone }}</div>
            </div>
          </div>
        </b-col>
        <b-col md="6" lg="2">
          <div class="delivery-date mb-3">
            {{ job.deliveryDate }}
          </div>
        </b-col>
        <b-col sm="6" lg="4">
          <div class="description mb-4">
            {{ job.description }}
          </div>
        </b-col>
        <b-col sm="6" lg="3">
          <b-button-group variant="info" size="sm" class="w-100">
            <b-button @click="edit(job)"><i class="mic">edit</i></b-button>
            <b-button><i class="mic">archive</i></b-button>
            <b-button variant="danger" @click="remove(job)"><i class="mic">delete</i></b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </div>

    <overlay title="New Job" id="job-overlay">
      <!-- <div class="mb-5">
        <div class="avatar mx-auto">
          <div class="icon">
            <i class="mic">build</i>
          </div>
        </div>
      </div> -->

      <b-row>
        <b-col md="8" offset-md="2">
          <b-form-group>
            <b-textarea v-model="job.description" placeholder="Job Details" />
          </b-form-group>

          <b-form-group label="Delivery Date">
            <v-date-picker v-model="job.deliveryDate" is-inline is-expanded />
          </b-form-group>

          <b-form-group>
            <b-form-input v-model="job.customer" placeholder="Customer Name"/>
          </b-form-group>

          <b-form-group>
            <b-form-input v-model="job.phone" placeholder="Phone Number"/>
          </b-form-group>

          <b-row>
            <b-col>
              <b-button block variant="success" @click="save">Save Job</b-button>
            </b-col>
            <b-col>
              <b-button block variant="secondary" @click="cancel">Cancel</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </overlay>
  </div>
</template>

<script>
import Overlay from '../widgets/Overlay'
import OverlayTrigger from '../widgets/OverlayTrigger'

export default {
  components: {
    Overlay,
    OverlayTrigger
  },
  data() {
    return {
      jobModalTitle: 'Add new job',
      job: {
        deliveryDate: null,
        description: null,
        customer: null,
        phone: null
      },
      jobs: [
        {
          name: "Job 1"
        }
      ],
      colors: [
        '456', 'a44', '8a3', '75a'
      ]
    }
  },
  methods: {
    loadJobs() {
      var vm = this
      hoodie.store.withIdPrefix('jobs/').findAll().then(function (jobs) {
        jobs.sort((a, b) => {
          return a.deliveryDate < b.deliveryDate
        })
        vm.jobs = jobs
        console.log(jobs);
      }).catch(function (error) {
        alert(error)
      })
    },
    getInitials(name) {
      return name ? name.split(" ").map((n)=>n[0]).join('').toUpperCase() : '?';
    },
    getColor(text) {
      if (!text || !/^[a-z]+$/i.test(text)) {
        return this.colors[0]
      }

      text = text.toUpperCase()
      var index = 0;
      for (var i = 0; i < text.length; i++) {
        index += text.charCodeAt(i)
      }

      return '#' + this.colors[index % this.colors.length]
    },
    edit(job) {
      this.job = job
      this.$events.$emit('open-overlay')
    },
    save() {
      var vm = this
      var store = this.job._id ? hoodie.store : hoodie.store.withIdPrefix('jobs/')
      store.add(vm.job).then(function (doc) {
        console.log(doc)
        vm.loadJobs()
        vm.$events.$emit('close-overlay')
      }).catch(function (error) {
        alert(error)
      })
    },
    remove(job) {
      var vm = this

      this.$toasted.show('Are you sure you want to delete this?', {
        type: 'error',
        action: [
          {
            text: 'Yes',
            onClick: (e, toast) => {
              hoodie.store.remove(job._id)
              vm.loadJobs()
              toast.goAway(0)
            }
          },
          {
            text: 'No',
            onClick: (e, toast) => {
              toast.goAway(0)
            }
          }
        ]
      })
    },
    cancel() {
      this.$events.$emit('close-overlay')
    }
  },
  mounted() {
    this.loadJobs()
  }
}
</script>

<style lang="css" scoped>
</style>
