import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';

type Props = {
  params: { username: string; userId: number };
};

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);
  console.log('this is user', user);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <p>{user.username}</p>
    </main>
  );
}
