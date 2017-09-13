<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {

  },

  data() {
    return {
      name: 'App'
    }
  },

  computed: {
    ...mapState([

    ])
  },

  created() {

  },

  methods: {
    ...mapActions([

    ])
  }
}
</script>
