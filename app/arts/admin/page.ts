import { createTokenFromSecret } from '@/util/carf';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getArts } from '../../../database/arts';
import { getValidSessionByToken } from '../../../database/sessions';
import Dashboard from './Dashboard';

export default async function ArtAdminPage() {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // for example you may also check if session user is an admin role

  if (!session) {
    redirect('/login?returnTo=/arts/admin');
  }
  console.log('session', session);
  const csrfToken = createTokenFromSecret(session.csrfSecret);
  console.log('csrfToken', csrfToken);

  const arts = await getArts();

  return <Dashboard arts={arts} />;
}
