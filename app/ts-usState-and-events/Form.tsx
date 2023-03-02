'use client';

import { ChangeEvent, useState } from 'react';

export default function TsUseStateAndEventsForm() {
  const [name, setName] = useState<string | undefined>();
  const [arts, setArts] = useState<{ id: number; name: string }[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
  }

  return (
    <div>
      name:
      <input value={name} onChange={handleChange} />
      {name}
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setArts([{ id: 1, name: 'balli' }])}>
        add art
      </button>
      <h2>arts</h2>
      <ul>
        {arts.map((art) => (
          <li key={`art-${art.id}`}>{art.name}</li>
        ))}
      </ul>
    </div>
  );
}
