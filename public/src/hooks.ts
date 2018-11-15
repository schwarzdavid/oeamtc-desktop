import {events} from "./core/lib/Utils";
import {socket} from "./core/plugins/socket/lib";

events.on('trigger-call', event => {
    socket.emit('broadcast', {
        type: 'trigger-call',
        payload: event.data
    });

    return null;
});