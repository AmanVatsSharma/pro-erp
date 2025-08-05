import { builder } from './builder';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name'),
    role: t.exposeString('role'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

builder.queryField('users', (t) =>
  t.prismaField({
    type: ['User'],
    resolve: async (query, root, args, ctx, info) => {
      return ctx.prisma.user.findMany({ ...query });
    },
  })
);
