'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Painting } from '../../database/paintings';

type Props = {
  painting: any;
  art: Painting;
};

export default function RemovePainting(props: Props) {
  const [error, setError] = useState<string>();

  const router = useRouter();

  return (
    <main>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}

      <div key={`painting-${props.painting.id}`}>
        ∏
        <button
          onClick={async () => {
            // const locationId = props.locationId;

            const response = await fetch(
              `/api/paintings/${props.painting.id}`,
              {
                method: 'DELETE',
              },
            );

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
