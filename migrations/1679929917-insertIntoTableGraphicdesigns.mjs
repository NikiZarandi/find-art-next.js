const graphicdesigns = [{ id: 2, name: 'Graphicdesigns' }];

export async function up(sql) {
  await sql`
    INSERT INTO graphicdesigns ${sql(graphicdesigns, 'name')}
  `;
}

export async function down(sql) {
  // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-use-before-define
  for (const graphicdesigns of graphicdesigns) {
    await sql`
      DELETE FROM
        graphicdesigns
      WHERE
        id = ${graphicdesigns.id}
    `;
  }
}
