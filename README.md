# pro-erp

## Advanced Enterprise ERP Server

This project uses NestJS and GraphQL Yoga to build a world-class ERP backend with a plugin system for modular enterprise features.

### Features
- NestJS for scalable architecture
- GraphQL Yoga for high-performance GraphQL API
- Plugin system for dynamic module registration
- Ready for Pothos/Prisma auto-schema generation

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run start
   ```
3. Access GraphQL endpoint at `/graphql`

## Auto Schema Generation
- Uses Pothos with Prisma for automatic GraphQL schema generation from your database models.

## Plugin System
- Register modules as plugins for dynamic schema and feature extension.
- Example: `server.registerPlugin({ name: 'Inventory', schema: inventorySchema })`

## RBAC Auth
- Role-based access control utility in `src/auth/rbac.ts`.
- Integrate with context for secure, enterprise-grade authorization.

### Next Steps
- Integrate Pothos for auto-schema generation
- Add Prisma for database access
- Implement dynamic plugin loading
