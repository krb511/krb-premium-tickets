import { Client, Collection, CommandInteraction, SlashCommandBuilder, PermissionResolvable } from 'discord.js';

export interface Command {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    permissions?: PermissionResolvable[];
    cooldown?: number;
    execute: (interaction: CommandInteraction, client: IKRBClient) => Promise<void>;
}

export interface IKRBClient extends Client {
    commands: Collection<string, Command>;
    cooldowns: Collection<string, number>;
}

export type TicketStatus = 'OPEN' | 'CLAIMED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export interface WebhookLogPayload {
    title: string;
    description: string;
    color: number;
    fields?: { name: string; value: string; inline?: boolean }[];
    author?: { name: string; icon_url?: string };
}
