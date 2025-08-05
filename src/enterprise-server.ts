import { createYoga, YogaInitialContext, Plugin } from '@graphql-yoga/node';
import { Application } from 'express';
import { GraphQLSchema } from 'graphql';

export interface EnterprisePlugin {
  name: string;
  schema: GraphQLSchema;
  plugin?: Plugin;
}

export class EnterpriseServer {
  private plugins: EnterprisePlugin[] = [];
  private yoga: ReturnType<typeof createYoga>;

  constructor(private app: Application, baseSchema: GraphQLSchema) {
    this.yoga = createYoga({
      schema: baseSchema,
      plugins: [],
    });
    this.app.use('/graphql', this.yoga);
  }

  registerPlugin(plugin: EnterprisePlugin) {
    this.plugins.push(plugin);
    // Merge schemas and plugins dynamically (advanced logic can be added)
    // For now, just log registration
    console.log(`Plugin registered: ${plugin.name}`);
  }

  getRegisteredPlugins() {
    return this.plugins.map(p => p.name);
  }
}
