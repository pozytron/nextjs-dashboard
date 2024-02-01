import {Customer, CustomersTableType, User} from "@/app/lib/definitions";
import {sql} from "@vercel/postgres";
import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import {formatCurrency} from "@/app/lib/utils";

export async function getUser(email: string) {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

const ITEMS_PER_PAGE = 6


export async function fetchUserPages(query: string) {
    try {
        const count = await sql`
      SELECT COUNT(*)
      FROM users
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`}
    `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all users.');
    }
}

export async function fetchFilteredUsers(query: string, currentPage: number) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const data = await sql<User>`
		SELECT 
		users.id,
		  users.name,
		  users.email,
		  users.is_admin,
		  users.is_active
		FROM users
		WHERE
		  users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`}
  	   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

        return data.rows
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch user table.');
    }
}

export async function fetchUserById(id: string) {
    noStore();
    try {
        const data = await sql<User>`
      SELECT
        users.id,
        users.name,
        users.email,
        users.is_admin,
        users.is_active
      FROM users
      WHERE users.id = ${id};
    `;

        return data.rows[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user.');
    }
}