// this should be CommonJS style
const {db} = require('@vercel/postgres');
const {
    invoices,
    customers,
    revenue,
    users,
    coupons,
    monsters,
    user_monsters
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        isActive BOOLEAN DEFAULT true,
        isAdmin BOOLEAN DEFAULT false
      );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
        INSERT INTO users (id, name, email, password,is_active,is_admin)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword},${user.is_active}, ${user.is_admin})
        ON CONFLICT (id) DO NOTHING;
      `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedInvoices(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "invoices" table if it doesn't exist
        const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

        console.log(`Created "invoices" table`);

        // Insert data into the "invoices" table
        const insertedInvoices = await Promise.all(
            invoices.map(
                (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedInvoices.length} invoices`);

        return {
            createTable,
            invoices: insertedInvoices,
        };
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
}

async function seedCustomers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "customers" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

        console.log(`Created "customers" table`);

        // Insert data into the "customers" table
        const insertedCustomers = await Promise.all(
            customers.map(
                (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedCustomers.length} customers`);

        return {
            createTable,
            customers: insertedCustomers,
        };
    } catch (error) {
        console.error('Error seeding customers:', error);
        throw error;
    }
}

async function seedRevenue(client) {
    try {
        // Create the "revenue" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

        console.log(`Created "revenue" table`);

        // Insert data into the "revenue" table
        const insertedRevenue = await Promise.all(
            revenue.map(
                (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedRevenue.length} revenue`);

        return {
            createTable,
            revenue: insertedRevenue,
        };
    } catch (error) {
        console.error('Error seeding revenue:', error);
        throw error;
    }
}

async function seedCoupons(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "customers" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS coupons (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id) DEFAULT NULL,
        code VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        redeem_timestamp TIMESTAMP
      );
    `;

        console.log(`Created "coupons" table`);

        // Insert data into the "coupons" table
        const inserted = await Promise.all(
            coupons.map(
                (coupon) => client.sql`
        INSERT INTO coupons (id, code, description, created_at, redeem_timestamp)
        VALUES (${coupon.id}, ${coupon.code}, ${coupon.description}, ${coupon.created_at}, ${coupon.redeem_timestamp})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${inserted.length} coupons`);

        return {
            createTable,
            coupons: inserted,
        };
    } catch (error) {
        console.error('Error seeding coupons:', error);
        throw error;
    }
}

async function seedMonsters(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "customers" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS monsters (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            power INT,
            image TEXT,
            planet TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            team VARCHAR(255) CHECK (team IN ('earth', 'water', 'fire', 'wind') OR team IS NULL),
            is_active BOOLEAN DEFAULT FALSE,
            description TEXT
      );
    `;

        console.log(`Created "monsters" table`);

        // Insert data into the "monsters" table
        const inserted = await Promise.all(
            monsters.map(
                (monster) => client.sql`
        INSERT INTO monsters (id, name, power, image, description, planet,created_at,updated_at,team,is_active)
        VALUES (${monster.id}, ${monster.name}, ${monster.power}, ${monster.image}, ${monster.description}, ${monster.planet}, ${monster.created_at}, ${monster.updated_at}, ${monster.team}, ${monster.is_active})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${inserted.length} monsters`);

        return {
            createTable,
            monsters: inserted,
        };
    } catch (error) {
        console.error('Error seeding monsters:', error);
        throw error;
    }
}

async function seedUserMonsters(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "customers" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS user_monsters (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID REFERENCES users(id) NOT NULL,
            monster_id UUID REFERENCES monsters(id) NOT NULL,
            acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        console.log(`Created "user_monsters" table`);

        // Insert data into the "monsters" table
        const inserted = await Promise.all(
            user_monsters.map(
                (monster) => client.sql`
        INSERT INTO user_monsters (id, user_id, monster_id, acquired_at)
        VALUES (${monster.id}, ${monster.user_id}, ${monster.monster_id}, ${monster.acquired_at})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${inserted.length} user_monsters`);

        return {
            createTable,
            user_monsters: inserted,
        };
    } catch (error) {
        console.error('Error seeding user_monsters:', error);
        throw error;
    }
}


async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedCustomers(client);
    await seedInvoices(client);
    await seedRevenue(client);
    await seedCoupons(client);
    await seedMonsters(client)
    await seedUserMonsters(client)
    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
