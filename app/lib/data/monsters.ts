import {User} from "@/app/lib/definitions";
import {sql} from "@vercel/postgres";
import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";

const ITEMS_PER_PAGE = 6


export async function fetchMonsterPages(query: string) {
    try {
        const count = await sql`
      SELECT COUNT(*)
      FROM monsters
      WHERE
        name ILIKE ${`%${query}%`} OR
        team ILIKE ${`%${query}%`}
    `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all monsters.');
    }
}

type Monster = {
    id: string;
    name: string;
    power: string;
    image: string;
    planet: string;
    team: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

export async function fetchFilteredMonsters(query: string, currentPage: number) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const data = await sql<Monster>`
		SELECT 
		monsters.id,
		  monsters.name,
		  monsters.power,
		  monsters.image,
		  monsters.planet,
		  monsters.team,
		  monsters.created_at,
		  monsters.updated_at,
		  monsters.is_active
		FROM monsters
		WHERE
		  monsters.name ILIKE ${`%${query}%`} OR
          monsters.team ILIKE ${`%${query}%`}
  	   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

        return data.rows
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch monsters table.');
    }
}

export async function fetchMonsterById(id: string) {
    noStore();
    try {
        const data = await sql<Monster>`
      SELECT
        monsters.id,
        monsters.name,
   	  monsters.power,
		  monsters.image,
		  monsters.planet,
		  monsters.team,
		  monsters.created_at,
		  monsters.updated_at,
		  monsters.is_active
      FROM monsters
      WHERE monsters.id = ${id};
    `;

        return data.rows[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch monster.');
    }
}


export async function fetchActiveMonsters() {
    noStore();
    try {
        const data = await sql<Monster>`
      SELECT
        monsters.id,
        monsters.name,
   	    monsters.power,
		monsters.image,
		monsters.planet,
		monsters.team,
		monsters.created_at,
		monsters.updated_at,
		monsters.is_active
      FROM monsters
      WHERE monsters.is_active = ${true};
    `;
        return data.rows
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch active monsters.');
    }
}
export async function fetchRandomActiveMonster() {
    noStore();
    try {
        const data = await sql<Monster>`
      SELECT
        monsters.id,
        monsters.name,
   	    monsters.power,
		monsters.image,
		monsters.planet,
		monsters.team,
		monsters.created_at,
		monsters.updated_at,
		monsters.is_active
      FROM monsters
      WHERE monsters.is_active = ${true}
      ORDER BY RANDOM()
      Limit 1
    `;

        return data.rows[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch a random active monster.');
    }
}