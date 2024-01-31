import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import {sql} from "@vercel/postgres";
type Coupon = {
    id: string;
    code: string;
    description:string;
    created_at: string;
    redeem_timestamp: string;
}


const ITEMS_PER_PAGE = 6;


export async function fetchCouponsPages(query:string) {
    noStore();
    try {
        const count = await sql`
        SELECT COUNT(*)
        FROM coupons
        WHERE
        coupons.code ILIKE ${`%${query}%`} OR
        coupons.created_at::text ILIKE ${`%${query}%`} OR
        coupons.redeem_timestamp::text ILIKE ${`%${query}%`} 
        `;
        return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of coupons.');
    }
}
export async function fetchFilteredCoupons(query: string, currentPage: number) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const coupons = await sql`
      SELECT
        coupons.id,
        coupons.code,
        coupons.description,
        coupons.created_at,
        coupons.redeem_timestamp,
        users.name
        FROM coupons
        LEFT JOIN users ON coupons.user_id = users.id
        WHERE 
        coupons.code ILIKE ${`%${query}%`} OR
        coupons.created_at::text ILIKE ${`%${query}%`} OR
        coupons.redeem_timestamp::text ILIKE ${`%${query}%`} OR 
        users.name ILIKE ${`%${query}%`}
        ORDER BY coupons.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        return coupons.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch coupons.');
    }
}
