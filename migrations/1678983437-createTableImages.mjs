export async function up(sql) {
  await sql`
    CREATE TABLE images (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      arts_id integer REFERENCES arts(id) ON DELETE CASCADE,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      image_url varchar (500),
      caption varchar (500)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE images
  `;
}
