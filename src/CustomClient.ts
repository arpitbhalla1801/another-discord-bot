import { Client, ClientOptions, Collection, REST, Routes } from "discord.js";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";

export default class CustomClient extends Client {
    commands: Collection<string, any>;
    _token: string;
    clientId: string;
    guildId: string;

    constructor(options: ClientOptions, token: string, clientId: string, guildId: string) {
        super(options);
        this.commands = new Collection();
        this._token = token;
        this.clientId = clientId;
        this.guildId = guildId;
    }

    private async loadModules(dir: string, isCommand: boolean): Promise<void> {
        const items = readdirSync(dir);

        for (const item of items) {
            const itemPath = join(dir, item);

            if (lstatSync(itemPath).isDirectory()) {
                await this.loadModules(itemPath, isCommand);
            } else {
                try {
                    const module = await import(itemPath);
                    if (isCommand) {
                        this.registerCommand(module.default, itemPath);
                    } else {
                        this.registerEvent(module.default, itemPath);
                    }
                } catch (error) {
                    console.error(`${itemPath}:`, error);
                }
            }
        }
    }

    private registerCommand(command: any, path: string): void {
        
        if ('data' in command && 'execute' in command) {
            this.commands.set(command.data.name, command);
            console.log(`${path} - ✅`);
        } else {
            console.warn(`${path} - ❌`);
        }
    }

    private registerEvent(event: any, path: string): void {
        
        if (event.name && event.execute) {
            
            if (event.once) {
                this.once(event.name, (...args: any[]) => event.execute(...args));
            } else {
                this.on(event.name, (...args: any[]) => event.execute(...args));
            }
            console.log(`${path} - ✅`);
        } else {
            console.log(`${path} - ❌`);
        }
    }

    async loadCommands(): Promise<void> {
        console.log('Commands');
        const commandsPath = join(__dirname, 'commands');
        await this.loadModules(commandsPath, true);
    }

    async loadEvents(): Promise<void> {
        console.log('Events');
        const eventsPath = join(__dirname, 'events');
        await this.loadModules(eventsPath, false);
    }


    async deployCommands(): Promise<void> {
        const rest = new REST({ version: '10' }).setToken(this._token);

        try {
            const commands = this.commands.map(command => command.data.toJSON());
            const data = await rest.put(
                Routes.applicationGuildCommands(this.clientId, this.guildId),
                { body: commands },
            );
            console.log(`registered ${(data as any).length} commands`);
        } catch (error) {
            console.error('Error deploying commands:', error);
        }
    }

    login(): Promise<string> {
        return super.login(this._token);
    }
}
