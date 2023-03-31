'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Art } from '../../../database/arts';
import styles from './profilepage.module.scss';

type Props = {
  arts: Art[];
  userId: number;
};

export default function AddArt(props: Props) {
  const [arts, setArts] = useState<Art[]>(props.arts);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<number>();
  const [imageSrc, setImageSrc] = useState<string>('');
  const [uploadData, setUploadData] = useState<Blob>();
  const [error, setError] = useState<{ message: string }[]>([]);
  const router = useRouter();

  console.log('category number', typeof category);
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

    for (const file of fileInput.files!) {
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
    // console.log('data.secure_url');
    setUploadData(data);
  }

  return (
    <main>
      <div>
        <div className={styles.container}>
          <h1 className={styles.h1}>SHARE YOUR ARTS & DESIGNS!</h1>
          {/* <p>{error}</p> */}
          <div className={styles.choosefile}>
            <form method="post" onSubmit={handleOnSubmit}>
              <label className={styles.figure}>
                Upload your image here:
                <input onChange={handleOnChange} type="file" name="file" />
              </label>
              <p>Preview</p>
              <figure className={styles.figure}>
                <img src={imageSrc} alt="User" />
              </figure>
              <div>
                <button className={styles.uploud}>Upload</button>
              </div>
            </form>

            <label className={styles.boxinfo} htmlFor="caption">
              description
            </label>

            <br />
            <input
              className={styles.boxinfo}
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />

            <br />
            <label className={styles.boxinfo} htmlFor="caption">
              name
            </label>

            <br />
            <input
              className={styles.boxinfo}
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />

            <br />
            <label className={styles.boxinfo} htmlFor="caption">
              category
            </label>
            <br />

            {/* <input
              className={styles.boxinfo}
              value={category}
              onChange={(event) => setCategory(event.currentTarget.value)}
            /> */}

            <select
              className={styles.boxinfo}
              id="dropdown"
              value={category}
              onChange={(event) =>
                setCategory(Number(event.currentTarget.value))
              }
              // onChange={(event) => setCategory(event.currentTarget.value)}
            >
              <option value={1}>Painting</option>
              <option value={2}>Graphicdesign</option>
              <option value={3}>Industrialdesign</option>
              <option value={4}>Jewelry</option>
            </select>
            <div>
              <button
                className={styles.boxinfo}
                onClick={async (event) => {
                  // console.log('hallo');
                  // const userId = props.userId;
                  // const imageUrl = imageSrc;
                  event.preventDefault();
                  const response = await fetch('/api/arts', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: name,
                      imageUrl: imageSrc,
                      description: description,
                      userId: props.userId,
                      categoriesId: Number,
                    }),
                  });
                  const data = await response.json();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }

                  // router.replace(`/profile/${username}`);
                  setArts([...arts, data.art]);
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
      </div>
    </main>
  );
}
