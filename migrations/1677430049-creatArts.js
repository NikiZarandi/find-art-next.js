export async function up(sql) {
  await sql`
    CREATE TABLE art(
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      diescription varchar(100) NOT NULL,
      user-id integer REFERENCES categories(id),
      user_id integer REFERENCES users (id),
      image_URL varchar (200)

    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE art
  `;
}
