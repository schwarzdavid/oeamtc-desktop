import {config} from "./core/plugins/config/lib";
import {events} from './core/lib/Utils';
import {RouteConfig} from "vue-router";
import RegisterComponent from './components/custom/Register.vue';
import AtWorkComponent from './components/mission/AtWork.vue';
/*
const routes = config.get('routes');

events.on('mission-routes', event => {
    const missionRoutes: RouteConfig[] = event.data;

    const atWorkRoute = missionRoutes.find(route => route.name === routes.atWork);

    if (atWorkRoute) {
        atWorkRoute.component = AtWorkComponent;
    }

    return missionRoutes;
});*/