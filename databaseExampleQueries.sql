INSERT INTO arts(name,description,category_id)
VALUES
  ('painting', 'this is the description of the first art',1 ),
  ('book', 'this is the description of the first art',2 ),
  ('new art', 'this is the description of the first art',1 );





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
  // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-use-before-define
  for (const category of category) {
    await sql`
      DELETE FROM
        category
      WHERE
        id = ${category.id}
    `;
  }
}



export async function up(sql) {
  await sql`
    CREATE TABLE category(
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE category
  `;
}
