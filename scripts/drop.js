const {db} = require("@vercel/postgres");

async function dropUsers(client) {
    try {
        await client.sql`DROP TABLE users`;
        console.log(`Dropped "users" table`);
    } catch (error) {
        console.error('Error dropping users:', error);
        throw error;
    }
}

async function dropCustomers(client) {
    try {
        await client.sql`DROP TABLE customers`;
        console.log(`Dropped "customers" table`);
    } catch (error) {
        console.error('Error dropping customers:', error);
        throw error;
    }
}

async function dropInvoices(client) {
    try {
        await client.sql`DROP TABLE invoices`;
        console.log(`Dropped "invoices" table`);
    } catch (error) {
        console.error('Error dropping invoices:', error);
        throw error;
    }
}

async function dropRevenue(client) {
    try {
        await client.sql`DROP TABLE revenue`;
        console.log(`Dropped "revenue" table`);
    } catch (error) {
        console.error('Error dropping revenue:', error);
        throw error;
    }
}

async function main() {
    throw new Error('This should not be run by accident!! If you really want to drop the database, comment this line and rerun the command.');
    const client = await db.connect();

    await dropUsers(client);
    await dropCustomers(client);
    await dropInvoices(client);
    await dropRevenue(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to drop the database:',
        err,
    );
});
