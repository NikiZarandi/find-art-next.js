'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Painting } from '../../../database/paintings';
import styles from './profilepage.module.scss';

type Props = {
  arts: Painting[];
  userId: number;
};

export default function AddPainting(props: Props) {
  const [paintings, setPaintings] = useState<Painting[]>(props.arts);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [uploadData, setUploadData] = useState<Blob>();
  const [error, setError] = useState<{ message: string }[]>([]);
  const router = useRouter();
  const dropdown = document.getElementById('dropdown');

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const files = changeEvent.target.files!;

    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImageSrc(onLoadEvent.target!.result as string);
      setUploadData(undefined);
    };

    reader.readAsDataURL(files[0]!);
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = (Array.from(form.elements) as HTMLInputElement[]).find(
      ({ name }) => name === 'file',
    );

    if (!fileInput) {
      setError([{ message: 'No file found!' }]);
      return;
    }

    const formData = new FormData();

    for (const file of fileInput.files as FileList) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dydbyfeae/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    // console.log(data.secure_url);
    setUploadData(data);
  }

  return (
    <main>
      <div>
        <div>
          <h1 className={styles.h1}>SHARE YOUR ARTS & DESIGNS!</h1>
          {/* <p>{error}</p> */}
          <form method="post" onSubmit={handleOnSubmit}>
            <label>
              Upload your image here:
              <br />
              <br />
              <br />
              <input onChange={handleOnChange} type="file" name="file" />
            </label>
            <p>Preview</p>
            <figure>
              <img src={imageSrc} alt="User" />
            </figure>
            <div>
              <button className={styles.uploud}>Upload</button>
            </div>
          </form>

          <label className={styles.main} htmlFor="caption">
            description
          </label>

          <br />
          <input
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />

          <br />
          <label htmlFor="caption">name</label>

          <br />
          <input
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />

          <div>
            <button
              className={styles.create}
              onClick={async (event) => {
                // const userId = props.userId;
                const imageUrl = imageSrc;
                event.preventDefault();
                const response = await fetch('/api/paintings', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: name,
                    imageUrl: imageSrc,
                    description: description,
                    userId: props.userId,
                    categoriesId: category,
                  }),
                });
                const data = await response.json();

                if (data.error) {
                  setError(data.error);
                  return;
                }

                // router.replace(`/profile/${username}`);
                setPaintings([...paintings, data.painting]);
                router.refresh();
              }}
            >
              create
            </button>
          </div>
          {typeof error === 'string' && (
            <div style={{ color: 'red' }}>{error}</div>
          )}
          {/* </form> */}
        </div>
      </div>
    </main>
  );
}
