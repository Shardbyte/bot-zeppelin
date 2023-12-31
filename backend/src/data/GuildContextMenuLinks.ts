import { DeleteResult, InsertResult, Repository } from "typeorm";
import { BaseGuildRepository } from "./BaseGuildRepository";
import { dataSource } from "./dataSource";
import { ContextMenuLink } from "./entities/ContextMenuLink";

export class GuildContextMenuLinks extends BaseGuildRepository {
  private contextLinks: Repository<ContextMenuLink>;

  constructor(guildId) {
    super(guildId);
    this.contextLinks = dataSource.getRepository(ContextMenuLink);
  }

  async get(id: string): Promise<ContextMenuLink | null> {
    return this.contextLinks.findOne({
      where: {
        guild_id: this.guildId,
        context_id: id,
      },
    });
  }

  async create(contextId: string, contextAction: string): Promise<InsertResult> {
    return this.contextLinks.insert({
      guild_id: this.guildId,
      context_id: contextId,
      action_name: contextAction,
    });
  }

  async deleteAll(): Promise<DeleteResult> {
    return this.contextLinks.delete({
      guild_id: this.guildId,
    });
  }
}
