import { createYoga, YogaInitialContext, Plugin } from 'graphql-yoga';
import { Application } from 'express';
import { GraphQLSchema } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from './auth/jwt';
import { hasPermission } from './auth/rbac';

export interface EnterprisePlugin {
  name: string;
  schema: GraphQLSchema;
  plugin?: Plugin;
}

export class EnterpriseServer {
  private plugins: EnterprisePlugin[] = [];
  private yoga: ReturnType<typeof createYoga>;
  private prisma = new PrismaClient();

  constructor(private app: Application, baseSchema: GraphQLSchema) {
    this.yoga = createYoga({
      schema: baseSchema,
      context: async ({ request }) => {
        // Cast request to Express.Request for JWT extraction
        const user = getUserFromRequest(request as any);
        return {
          prisma: this.prisma,
          user,
          hasPermission,
        };
      },
      plugins: [],
    });
    this.app.use('/graphql', this.yoga);
  }

  registerPlugin(plugin: EnterprisePlugin) {
    this.plugins.push(plugin);
    // TODO: Merge schemas and plugins for dynamic modules
    console.log(`Plugin registered: ${plugin.name}`);
  }

  getRegisteredPlugins() {
    return this.plugins.map(p => p.name);
  }
}
