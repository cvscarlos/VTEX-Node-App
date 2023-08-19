import { UserInputError } from '@vtex/api';

export async function validate(context: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    state,
  } = context;

  console.info('Received params:', params);

  const { code } = params;

  if (!code) {
    throw new UserInputError('Code is required'); // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
  }

  const codeNumber = Number.parseInt(code as string, 10);

  state.code = codeNumber;

  await next();
}
