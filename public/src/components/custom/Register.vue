<template>
	<v-dialog v-model="registerDialogIsOpen" fullscreen hide-overlay lazy transition="dialog-bottom-transition">
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
</template>

<script lang="ts">
    import Vue from 'vue';
    import LoadingSpinner from '../../core/components/common/LoadingSpinner.vue';

    const path = require('path');
    const child = require('child_process');
    const remote = require('electron').remote;

    export default Vue.extend({
        components: {
            LoadingSpinner
        },

        data() {
            return {
                registerDialogIsOpen: false,
	            childProcess: null
            };
        },

	    props: ['trigger'],

        methods: {
            openDialog() {
                this.registerDialogIsOpen = true;

                this.childProcess = child.execFile(path.join(remote.process.cwd(), 'registrierkassa.exe'), (err) => {
                    if(err){

                    }
                });

                this.childProcess.unref();

                this.childProcess.on('exit', this.closeDialog);
                this.childProcess.on('error', this.closeDialog);
            },

            closeDialog() {
                this.registerDialogIsOpen = false;

                this.childProcess.off('exit', this.closeDialog);
                this.childProcess.off('error', this.closeDialog);
	            this.childProcess = null;

	            this.$emit('closed');
            }
        },

	    watch: {
            trigger(newVal){
                if(newVal === true){
                    this.openDialog();
                }
            }
	    }
    });
</script>