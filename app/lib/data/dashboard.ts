import {sql} from '@vercel/postgres';
import {    Revenue,} from '../definitions';
import {formatCurrency} from '../utils';
import {unstable_noStore as noStore} from 'next/cache';


/**
 * Fetches revenue data from the database.
 *
 * @returns An array of revenue data.
 */
export async function fetchRevenue() {
    noStore();
    try {
        const data = await sql<Revenue>`SELECT * FROM revenue`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchCardData() {
    noStore();
    try {
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const usersCountPromise = sql`SELECT COUNT(*) FROM users`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const couponsCountPromise = sql`SELECT COUNT(*) FROM coupons`;
        const monstersCountPromise = sql`SELECT COUNT(*) FROM monsters`;
        const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
            usersCountPromise,
            monstersCountPromise,
            couponsCountPromise
        ]);
        console.log(data[3])
        const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
        const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
        const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
        const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
        const totalUsers = Number(data[3].rows[0].count ?? '0');
        const totalMonsters = Number(data[4].rows[0].count ?? '0');
        const totalCoupons = Number(data[5].rows[0].count ?? '0');

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
            totalUsers,
            totalMonsters,
            totalCoupons
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

