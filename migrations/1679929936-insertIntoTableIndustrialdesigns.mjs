const industrialdesigns = [{ id: 3, name: 'Industrialdesigns' }];

export async function up(sql) {
  await sql`
    INSERT INTO industrialdesigns ${sql(industrialdesigns, 'name')}
  `;
}

export async function down(sql) {
  // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-use-before-define
  for (const industrialdesigns of industrialdesigns) {
    await sql`
      DELETE FROM
        industrialdesigns
      WHERE
        id = ${industrialdesigns.id}
    `;
  }
}
