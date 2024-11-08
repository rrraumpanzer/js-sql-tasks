import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async (user, roomNumber, price) => {
  const sql = postgres(config);
  
  try {
    await sql.begin(async (sql) => {
      const [newUser] = await sql`
        INSERT INTO users (username, phone)
        VALUES (${user.username}, ${user.phone})
        RETURNING id
      `;
      
      const [room] = await sql`
        SELECT id
        FROM rooms
        WHERE room_number = ${roomNumber}
      `;
      
      if (!room) {
        throw new Error('Room not found');
      }
      
      await sql`
        INSERT INTO orders (user_id, room_id, price)
        VALUES (${newUser.id}, ${room.id}, ${price})
      `;
      
      await sql`
        UPDATE rooms
        SET status = 'reserved'
        WHERE id = ${room.id}
      `;
    });
    
    await sql.end();
    
  } catch (error) {
    await sql.end();
    throw error;
  }
};
// END
