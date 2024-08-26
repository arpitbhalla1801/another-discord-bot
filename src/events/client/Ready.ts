import { Events, ActivityType } from 'discord.js';
import CustomClient from '../../CustomClient';
import { once } from 'events';
export default {
    name: Events.ClientReady,
    once: true,
    execute(client: CustomClient) {
        console.log(`logged in!`);
        client.user?.setPresence({activities: [{name: '/help', type: ActivityType.Playing}]});
    }
}