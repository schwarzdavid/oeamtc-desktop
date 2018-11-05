import router from './core/router/index';
import MissionComponent from './core/components/mission/Mission.vue';
import ArrivingComponent from './core/components/mission/Arriving.vue';
import AtWorkComponent from './components/mission/AtWork.vue'
import MovingOnComponent from './core/components/mission/MovingOn.vue';
import {config} from "./core/plugins/config/lib";

const routes = config.get('routes');

router.addRoutes([
    {
        path: '/mission',
        name: 'mission',
        component: MissionComponent,
        children: [
            {
                path: 'arriving',
                name: routes.arriving,
                component: ArrivingComponent
            },
            {
                path: 'at-work',
                name: routes.atWork,
                component: AtWorkComponent
            },
            {
                path: 'moving-on',
                name: routes.movingOn,
                component: MovingOnComponent
            }
        ]
    }
]);