<template>
	<div>
		<v-btn color="primary" @click="openDialog()">Registrierkasse</v-btn>

		<v-dialog v-model="registerDialog" fullscreen hide-overlay lazy transition="dialog-bottom-transition">
			<v-card>
				<v-btn fab color="warning" fixed top right small @click="closeDialog()">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-layout justify-center align-center style="height:100vh;">
					<loading-spinner></loading-spinner>
					<register></register>
				</v-layout>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import LoadingSpinner from '../../core/components/partials/LoadingSpinner.vue';

    const path = require('path');
    const child = require('child_process');
    const remote = require('electron').remote;

	export default Vue.extend({
		components: {
		    LoadingSpinner
		},

		data(){
		    return {
		        registerDialog: false,
			    childProcess: null
		    };
		},

        methods: {
            openDialog(){
	            this.registerDialog = true;

	            this.childProcess = child.execFile(path.join(remote.process.cwd(), 'registrierkassa.exe'), (err) => {
	                console.log(err);
	            });
            },

            closeDialog(){
                this.registerDialog = false;
            }
        }
	});
</script>