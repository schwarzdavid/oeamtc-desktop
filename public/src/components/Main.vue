<template>
	<core>
		<register :trigger="registerOpen" @closed="onRegisterClosed"></register>
	</core>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Core from '../core/Core.vue';
	import Register from './custom/Register.vue';
	import {events} from "../core/lib/Utils";

    export default Vue.extend({
		components: {
		    Core,
			Register
		},

		data(){
		    return {
		        registerOpen: false
		    };
		},

		methods: {
		    onRegisterClosed(){
		        this.registerOpen = false;
		        events.emit('register-finished');
		    },

			openRegister(){
		        this.registerOpen = true;
			}
		},

		created(){
		    events.on('register-open', this.openRegister);
		},

	    destroyed(){
		    events.off('register-open', this.openRegister);
	    }
	});
</script>