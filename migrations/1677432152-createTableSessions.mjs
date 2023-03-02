export async function up(sql) {
  await sql`
    CREATE TABLE session(
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      userName varchar(100) NOT NULL UNIQUE,
      expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL ' 24 houers',
      user_id inter PEFERENCES user(id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE sessions
  `;
}
