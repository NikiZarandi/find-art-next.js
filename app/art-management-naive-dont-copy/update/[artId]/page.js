import { updateArtById } from '../../../../database/arts';

export const dynamic = 'force-dynamic';

export const metadata = {
  description: 'Update a single art',
};

export default async function UpdateArtPage(props) {
  const art = await updateArtById(props.params.artId, props.searchParams.name);

  if (!art) {
    throw new Error('this action failed with Error id: 213123123');
  }

  return (
    <div>
      <h1>art with id {art.id} has been updated</h1>
      name: {art.name}
    </div>
  );
}
