import { deleteArtById } from '../../../database/arts';

export const dynamic = 'force-dynamic';

export const metadata = {
  description: 'Delete a art',
};

export default async function DeleteArtPage(props) {
  const art = await deleteArtById(props.params.artId);

  if (!art) {
    throw new Error('this action failed with Error id: 213123123');
  }

  return <div>art {art.name} deleted</div>;
}
