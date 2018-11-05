import router from './core/router/index';
import MissionComponent from './components/mission/Mission.vue';
import BeginComponent from './components/mission/Begin.vue';
import store from './core/store';
import {config} from "./core/plugins/config/lib";

router.addRoutes([
    {
        path: '/mission',
        name: 'mission',
        component: MissionComponent,
        children: [
            {
                path: 'arrival',
                name: 'arrival',
                component: BeginComponent
            }
        ]
    }
]);