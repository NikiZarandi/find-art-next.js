const jewelries = [{ id: 4, name: 'Jewelries' }];

export async function up(sql) {
  await sql`
    INSERT INTO jewelries ${sql(jewelries, 'name')}
  `;
}

export async function down(sql) {
  // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-use-before-define
  for (const jewelries of jewelries) {
    await sql`
      DELETE FROM
        jewelries
      WHERE
        id = ${jewelries.id}
    `;
  }
}
