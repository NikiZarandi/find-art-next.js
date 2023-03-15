import { getUserByUsername } from '../../../database/users';
import styles from './profilepage.module.scss';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  return (
    <>
      <div className={styles.Profilepage}>
        <h1>{user.username}</h1>
        {/* <p>id: {user.id}</p> */}
        <p> welcome to your profile page ! click to create your Arts hier.</p>

        <button>click here to upload your art!</button>
      </div>
    </>
  );
}
