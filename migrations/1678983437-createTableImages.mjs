export async function up(sql) {
  await sql`
    CREATE TABLE arts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      image_url varchar(500),
      description varchar(500),
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      categories_id integer REFERENCES category(id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE arts
  `;
}
