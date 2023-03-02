export async function up(sql) {
  await sql`
    CREATE TABLE arts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      description varchar(100) NOT NULL,
      category varchar(100) NOT NULL,
      image_URL varchar(200)
    )`;
}

export async function down(sql) {
  await sql`
    DROP TABLE arts
  `;
}
