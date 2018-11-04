import {config} from './core/plugins/config/lib';

const defaultConfig = {
    missionRoute: '/mission/begin'
};

config.inject(defaultConfig);