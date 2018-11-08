import router from './core/router/index';
import MissionComponent from './core/components/mission/Mission.vue';
import ArrivingComponent from './core/components/mission/Arriving.vue';
import AtWorkComponent from './components/mission/AtWork.vue'
import MovingOnComponent from './core/components/mission/MovingOn.vue';
import {config} from "./core/plugins/config/lib";
import store from "./core/store";
import {UserState} from "./core/store/user/types";

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
                component: ArrivingComponent,
                meta: {
                    requireState: UserState.ARRIVING
                }
            },
            {
                path: 'at-work',
                name: routes.atWork,
                component: AtWorkComponent,
                meta: {
                    requireState: UserState.AT_WORK
                }
            },
            {
                path: 'moving-on',
                name: routes.movingOn,
                component: MovingOnComponent,
                meta: {
                    requireState: UserState.MOVING_ON
                }
            }
        ]
    }
]);