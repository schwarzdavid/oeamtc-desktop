<template>
	<div>
		<mission-actions>
			<template slot="actions">
				<register></register>
			</template>
		</mission-actions>
	</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import MissionActions from '../../core/components/partials/MissionActions.vue';
    import Register from '../custom/Register.vue';

    export default Vue.extend({
        components: {
            MissionActions,
	        Register
        }
    });
</script>