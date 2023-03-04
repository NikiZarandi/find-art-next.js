export async function up(sql) {
  await sql`
    CREATE TABLE arts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      description varchar(100) NOT NULL,
      category_id integer REFERENCES category(id),
      image_URL varchar(200)
    )`;
}

export async function down(sql) {
  await sql`
    DROP TABLE arts
  `;
}

// user_id integer REFERENCES users (id),
