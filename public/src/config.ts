import {config} from './core/plugins/config/lib';

console.log('Setting config now');

const defaultConfig = {
    useDefaultMissionRoutes: false
};

config.inject(defaultConfig);