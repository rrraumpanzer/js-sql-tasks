import postgres from "postgres";
import solution from "../solution.js";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

beforeEach(async () => {
  const sql = postgres(config);

  await sql`
    DROP TABLE IF EXISTS books
  `;

  await sql`CREATE TABLE books(title VARCHAR(255), author VARCHAR(255))`;

  await sql.end();
});

test("Check solution", async () => {
  const book = {
    title: "War and Peace",
    author: "Leo Tolstoy",
  };
  await solution(book);

  const sql = postgres(config);

  const res = await sql`SELECT title, author FROM books`;

  expect(res).toEqual([book]);

  await sql.end();
});
