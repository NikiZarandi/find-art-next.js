const category = [
  { id: 1, name: 'Painting' },
  { id: 2, name: 'Design' },
  { id: 3, name: 'Jewellry' },
  { id: 4, name: 'Product Design' },
];

export async function up(sql) {
  await sql`
    INSERT INTO category ${sql(category, 'name')}
  `;
}

export async function down(sql) {
  for (const category of category) {
    await sql`
      DELETE FROM
        category
      WHERE
        id = ${category.id}
    `;
  }
}
