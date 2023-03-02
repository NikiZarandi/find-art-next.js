import { createArt } from '../../../database/arts';

export const dynamic = 'force-dynamic';

export const metadata = {
  description: 'Create a new art',
};

export default async function UpdateArtPage(props) {
  const art = await createArt(props.searchParams.name);

  if (!art) {
    throw new Error('this action failed with Error id: 213123123');
  }

  return (
    <div>
      <h1>art with id {art.id} has been created</h1>
      name: {art.name}
    </div>
  );
}
