import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import {sql} from "@vercel/postgres";
type Coupon = {
    id: string;
    code: string;
    description:string;
    created_at: string;
    redeem_timestamp: string;
}


const ITEMS_PER_PAGE = 16;

export async function fetchCoupon(code:string) {
    noStore();
    try {
        const coupon = await sql`
        SELECT
        coupons.id,
        coupons.code,
        coupons.description,
        coupons.created_at,
        coupons.redeem_timestamp
        FROM coupons
        WHERE code = ${code}`
        return coupon.rows[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch coupon.');
    }
}

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

export async function markCouponAsRedeemed(userId:string, couponId:string) {
    try {
        const result = await sql`
            UPDATE coupons
            SET redeem_timestamp = NOW(), user_id = ${userId}
            WHERE id = ${couponId} AND redeem_timestamp IS NULL
            RETURNING *;  
        `;
        if (result.rows.length === 0) {
            console.log('Coupon not found, already redeemed, or user ID is invalid.');
            return null;
        }

        console.log('Coupon redeemed successfully for user:', result);
        return result;
    } catch (error) {
        console.error('Error redeeming coupon for user:', error);
        throw error;
    }
}
