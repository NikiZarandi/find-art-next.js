'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Art } from '../../../database/arts';

type Props = {
  arts: Art[];
  // imageUrl: string;
  userId: number;
  // caption: string;
  // artId: number;
  // user: {
  //   id: number;
  // };
  // art: {
  //   id: number;
  // };
};

export default function AddArt(props: Props) {
  const [arts, setArts] = useState<Art[]>(props.arts);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [uploadData, setUploadData] = useState<Blob>();
  const [error, setError] = useState<string>();
  const router = useRouter();

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImageSrc(onLoadEvent.target!.result as string);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    ) as HTMLInputElement;

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
    setUploadData(data);
  }

  return (
    <main>
      <div>
        <div className="card-body">
          <h1>Share your arts and designs!</h1>
          <p>{error}</p>
          <form method="post" onSubmit={handleOnSubmit}>
            <label>
              Upload your image here:
              <br />
              <input onChange={handleOnChange} type="file" name="file" />
            </label>
            <p>Preview</p>
            <figure>
              <img src={imageSrc} alt="User" />
            </figure>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Upload</button>
            </div>
          </form>

          <label htmlFor="caption">Caption</label>
          <input
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={async (event) => {
                // const userId = props.userId;
                const imageUrl = imageSrc;
                event.preventDefault();
                const response = await fetch('/api/images', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    imageUrl,
                    description: description,
                    name: name,
                    // categoriesId: props.art.categiresId,
                    // userId: props.user.id,
                  }),
                });
                const data = await response.json();

                if (data.error) {
                  setError(data.error);
                  return;
                }

                // router.replace(`/profile/${username}`);
                setArts([...arts, data.image]);
                router.refresh();
              }}
            >
              Post image
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