const paintings = [{ id: 1, name: 'Painting' }];

export async function up(sql) {
  await sql`
    INSERT INTO paintings ${sql(paintings, 'name')}
  `;
}

export async function down(sql) {
  // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-use-before-define
  for (const paintings of paintings) {
    await sql`
      DELETE FROM
        paintings
      WHERE
        id = ${paintings.id}
    `;
  }
}
