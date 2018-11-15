import {config} from "./core/plugins/config/lib";
import {events} from './core/lib/Utils';
import {RouteConfig} from "vue-router";
import RegisterComponent from './components/custom/Register.vue';
import AtWorkComponent from './components/mission/AtWork.vue';

const routes = config.get('routes');

events.on('mission-routes', event => {
    const missionRoutes: RouteConfig[] = event.data;

    const atWorkRoute = missionRoutes.find(route => route.name === routes.atWork);

    if (atWorkRoute) {
        atWorkRoute.component = AtWorkComponent;
    }

    return missionRoutes;
});

/*
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
]);*/