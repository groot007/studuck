<template>
	<div>
		<h2>        <v-icon>home</v-icon>
HOME</h2>
  </v-form>
	</div>
	
</template>

<script>
  import firebase from '../shared/firebase';


  export default {
    name: 'Home',
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }),
    methods: {
    	
    }
  }
</script>

<style lang="scss">

</style>