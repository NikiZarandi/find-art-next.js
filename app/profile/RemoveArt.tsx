'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Art } from '../../database/arts';

type Props = {
  art: Art;
};

export default function RemoveArt(props: Props) {
  const [error, setError] = useState<string>();

  const router = useRouter();

  return (
    <main>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}

      <div key={`art-${props.art.id}`}>
        <button
          onClick={async () => {
            // const locationId = props.locationId;

            const response = await fetch(`/api/arts/${props.art.id}`, {
              method: 'DELETE',
            });

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              return;
            }

            router.refresh();
          }}
        >
          ❌
        </button>
      </div>
    </main>
  );
}
