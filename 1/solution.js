import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async function solution() {
  const sql = postgres(config);

  try {
    await sql`CREATE TABLE IF NOT EXISTS articles (
      title VARCHAR(255),
      description VARCHAR(255)
    )`;

    const title = 'A';
    const description = 'a';
    
    await sql`INSERT INTO articles (title, description) 
      VALUES (${title}, ${description})`;
  } finally {
    await sql.end();
  }
}
// END
