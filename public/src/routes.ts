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
        beforeEnter(to, from, next){
            const missionRoute = config.get('missionRoute');
            if(!store.state.missions.assignedMission || !missionRoute) {
                return next('/');
            }
            return next();
        },
        children: [
            {
                path: 'begin',
                name: 'begin',
                component: BeginComponent
            }
        ]
    }
]);

router.beforeEach((to, from, next) => {
    const missionRoute = config.get('missionRoute');
    if(store.state.missions.assignedMission && missionRoute && !to.matched.find(route => route.path === missionRoute)) {
        return next(missionRoute);
    }
    return next();
});