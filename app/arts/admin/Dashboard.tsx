'use client';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Art } from '../../../database/arts';

type Props = {
  arts: Art[];
  csrfToken: string;
};

export default function Dashboard(props: Props) {
  // const router = useRouter();
  const [arts, setArts] = useState<Art[]>(props.arts);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [name, setName] = useState<string>('');

  const [editName, setEditName] = useState<string>('');

  const [error, setError] = useState<string>();

  return (
    <div>
      <label>
        Name:
        <input
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </label>

      <button
        onClick={async () => {
          const response = await fetch('/api/animals', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,

              csrfToken: props.csrfToken,
            }),
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh();

          setArts([...arts, data.art]);
        }}
      >
        Create Art
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {arts.map((art) => (
          <div key={`art-${art.id}`}>
            {idOnEditMode !== art.id ? (
              art.name
            ) : (
              <input
                value={editName}
                onChange={(event) => setEditName(event.currentTarget.value)}
              />
            )}{' '}
            : ( ){' '}
            <button
              onClick={async () => {
                const response = await fetch(`/api/arts/${art.id}`, {
                  method: 'DELETE',
                });

                const data = await response.json();

                if (data.error) {
                  setError(data.error);
                  return;
                }

                // router.refresh();

                setArts(
                  arts.filter((artOnState) => artOnState.id !== data.art.id),
                );
              }}
            >
              X
            </button>
            {idOnEditMode !== art.id ? (
              <button
                onClick={() => {
                  setIdOnEditMode(art.id);
                  setEditName(art.name);
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  const response = await fetch(`/api/arts/${art.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: editName,
                    }),
                  });

                  const data = await response.json();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setIdOnEditMode(undefined);

                  // router.refresh();
                  setArts(
                    arts.map((artOnState) => {
                      return artOnState.id !== data.art.id
                        ? artOnState
                        : data.art;
                    }),
                  );
                }}
              >
                save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
