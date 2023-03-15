// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import { getUserBySessionToken, User } from '../../../database/users';

// export type ProfileResponseBodyGet = { error: string } | { user: User };

// export async function GET(): Promise<NextResponse<ProfileResponseBodyGet>> {
//   // this is a protected Route Handler
//   // 1. get the session token from the cookie
//   const cookieStore = cookies();
//   const token = cookieStore.get('sessionToken');

//   // 2. validate that session
//   // 3. get the user profile matching the session
//   const user = token && (await getUserBySessionToken(token.value));

//   if (!user) {
//     return NextResponse.json({ error: 'user not found' });
//   }
//   // 4. return the user profile

//   return NextResponse.json({ user: user });
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    // 1. Get the cookie from the request and use it to validate the session
    const session =
      request.cookies.sessionToken &&
      (await getValidSessionByToken(request.cookies.sessionToken));

    if (!session) {
      response
        .status(400)
        .json({ errors: [{ message: 'No valid session token passed' }] });
      return;
    }

    // 2. Get the user from the token
    const user = await getUserBySessionToken(session.token);

    if (!user) {
      response
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    // return the user from the session token
    response.status(200).json({ user: user });
  } else {
    response.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
