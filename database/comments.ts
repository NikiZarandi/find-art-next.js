import { cache } from 'react';
import { sql } from './connect';

export type Comment = {
  id: number;
  content: string;
  imageId: number;
  userId: number;
};

export type CommentWithUsername = {
  id: number;
  content: string;
  imageId: number;
  userId: number;
  userName: string;
};

export const getCommentsForImageWithUsername = cache(
  async (imageId: number) => {
    const commentsWithUsername = await sql<CommentWithUsername[]>`
  SELECT
    *
  FROM
    comments
  INNER JOIN
    users ON comments.user_id = users.id
  WHERE
    comments.image_id = ${imageId}
  `;

    return commentsWithUsername;
  },
);

// get all comments for single image
export const getCommentsForImage = cache(async (imageId: number) => {
  const comments = await sql<CommentWithUsername[]>`
    SELECT * FROM comments WHERE comments.image_id = ${imageId}
  `;

  return comments;
});

// get a single comment
export const getCommentById = cache(async (id: number) => {
  const [comment] = await sql<CommentWithUsername[]>`
    SELECT
      *
    FROM
      comments
    WHERE
      id = ${id}
  `;
  return comment;
});

export const createComment = cache(
  async (
    content: string,
    imageId: number,
    userId: number,
    userName: string,
  ) => {
    const [comment] = await sql<CommentWithUsername[]>`
      INSERT INTO comments
        (content, image_id, user_id, user_name)
      VALUES
        (${content}, ${imageId}, ${userId}, ${userName})
      RETURNING *
    `;
    return comment;
  },
);

export const updateCommentById = cache(async (id: number, content: string) => {
  const [comment] = await sql<CommentWithUsername[]>`
      UPDATE
        comments
      SET
        content = ${content}
      WHERE
        id = ${id}
      RETURNING *
    `;
  return comment;
});

export const deleteCommentById = cache(async (id: number) => {
  const [comment] = await sql<CommentWithUsername[]>`
    DELETE FROM
      comments
    WHERE
      id = ${id}
    RETURNING *
  `;
  return comment;
});
