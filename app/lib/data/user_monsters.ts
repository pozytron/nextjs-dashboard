'use server'

import {sql} from "@vercel/postgres";

export async function fetchUserMonsters(id:string){
    try {
        const monsters = await sql`
      SELECT
        user_monsters.id,
      user_monsters.monster_id,
      monsters.name as monster_name,
        monsters.power,
        monsters.image,
        monsters.planet,
        monsters.team
      FROM user_monsters
      JOIN monsters ON user_monsters.monster_id = monsters.id
      WHERE user_monsters.user_id = ${`${id}`}
     ORDER BY user_monsters.acquired_at DESC`;

        return monsters.rows;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all monsters.');
    }
}

export async function addUserMonsterWithCoupon(userId:string, monsterId:string, couponId:string) {
    try {
        const result = await sql`
            INSERT INTO user_monsters (user_id, monster_id, coupon_id)
            VALUES (${userId}, ${monsterId}, ${couponId})
            RETURNING *;
            `;

        console.log('Added new user_monster with coupon:', result);
        return result;
    } catch (error) {
        console.error('Error adding user_monster with coupon:', error);
        throw error;
    }
}