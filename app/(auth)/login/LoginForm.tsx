'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './page.module.scss';

export default function LoginForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });

        const data: LoginResponseBodyPost = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        const returnTo = getSafeReturnToPath(props.returnTo);

        if (returnTo) {
          router.push(returnTo);
          return;
        }

        router.replace(`/profile/${data.user.username}`);
        router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <div className={styles.input}>
        <div className={styles.loginform}>
          <div className={styles.findart}>
            <h1>FIND ART</h1>
          </div>
          <h3 className={styles.h3}>Login</h3>
          <label className={styles.password}>
            username
            <input
              className={styles.color}
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label className={styles.password}>
            password
            <input
              className={styles.color}
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
          <div className={styles.mitte}>
            <button className={styles.button}>Login</button>
          </div>
        </div>
      </div>
    </form>
  );
}
