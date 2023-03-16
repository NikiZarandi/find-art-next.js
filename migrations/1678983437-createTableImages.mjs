export async function up(sql) {
  await sql`
    CREATE TABLE images (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      image_id integer REFERENCES images (id) ON DELETE CASCADE,
      user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE images
  `;
}
