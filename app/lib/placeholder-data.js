const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Admin',
    email: 'admin@nextmail.com',
    password: '123456',
    is_admin: true,
    is_active:true
  },
  {
    id: '410544b2-4001-4271-1111-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    is_admin: false,
    is_active:true
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const coupons = [
  {
    id: "3958dc9e-712f-0002-85e9-fec4b6a00000",
    code: "ABC-DEFG-HIJK",
    description: "kupon testowy",
    user_id: users[0].id,
    created_at: new Date().toISOString(),
    redeem_timestamp: new Date(),
  },
  {
    id: "3958dc9e-712f-0002-85e9-fec4b6a00001",
    code: "LMNO-PRST-UVWX",
    description: "kupon testowy",
    user_id: users[0].id,
    created_at: new Date().toISOString(),
    redeem_timestamp: new Date(),
  },
  {
    id: "3958dc9e-712f-0002-85e9-fec4b6a00002",
    code: "1234-5678-9101",
    user_id: users[1].id,
    description: "kupon testowy",
    created_at: new Date().toISOString(),
    redeem_timestamp: new Date(),
  },
  {
    id: "3958dc9e-712f-0002-85e9-fec4b6a00003",
    code: "AAAA-BBCC-DDDD",
    user_id: null,
    description: "kupon testowy",
    created_at: new Date().toISOString(),
    redeem_timestamp: null,
  }
];

const monsters = [
  {
    id: '3958dc9e-712f-0002-0001-000000000000',
    name: 'Leoś',
    power: 5,
    image: '/img/monsters/leos.svg',
    planet: '/img/planets/planet21.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000001',
    name: 'Tosia',
    power: 3,
    image: '/img/monsters/tosia.svg',
    planet: '/img/planets/planet3.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000002',
    name: 'Plazmuś',
    power: 2,
    image: '/img/monsters/plazmus.svg',
    planet: '/img/planets/planet20.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000003',
    name: 'Aloszka',
    power: 4,
    image: '/img/monsters/aloszka.svg',
    planet: '/img/planets/planet7.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000004',
    name: 'Beniu',
    power: 3,
    image: '/img/monsters/beniu.svg',
    planet: '/img/planets/planet21.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000005',
    name: 'Edi',
    power: 2,
    image: '/img/monsters/edi.svg',
    planet: '/img/planets/planet7.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000006',
    name: 'Bunia',
    power: 3,
    image: '/img/monsters/bunia.svg',
    planet: '/img/planets/planet3.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000007',
    name: 'Faris',
    power: 3,
    image: '/img/monsters/faris.svg',
    planet: '/img/planets/planet19.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000008',
    name: 'Tella',
    power: 2,
    image: '/img/monsters/tella.svg',
    planet: '/img/planets/planet18.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000009',
    name: 'Mikson',
    power: 5,
    image: '/img/monsters/mikson.svg',
    planet: '/img/planets/planet2.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000010',
    name: 'Fred',
    power: 4,
    image: '/img/monsters/fred.svg',
    planet: '/img/planets/planet20.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu,"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000011',
    name: 'Dino',
    power: 5,
    image: '/img/monsters/dino.svg',
    planet: '/img/planets/planet18.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu,"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000012',
    name: 'Roki',
    power: 2,
    image: '/img/monsters/roki.svg',
    planet: '/img/planets/planet19.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu,"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000013',
    name: 'Vidar',
    power: 3,
    image: '/img/monsters/vidar.svg',
    planet: '/img/planets/planet2.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu,"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000014',
    name: 'Bob',
    power: 4,
    image: '/img/monsters/bob.svg',
    planet: '/img/planets/planet16.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu,"
  },
  {
    id: '3958dc9e-712f-0002-0001-000000000015',
    name: 'Majson',
    power: 3,
    image: '/img/monsters/majson.svg',
    planet: '/img/planets/planet16.png',
    created_at: new Date(),
    updated_at: new Date(),
    team: null,
    is_active: false,
    description: "brak opisu,"
  }
]

const user_monsters = [
  {
    id:"aaaaaaaa-aaaa-0a0a-000a-000000000000",
    user_id: users[0].id,
    monster_id: monsters[0].id,
    acquired_at: new Date(),
  },
  {
    id:"aaaaaaaa-aaaa-0a0a-000a-000000000001",
    user_id: users[0].id,
    monster_id: monsters[1].id,
    acquired_at: new Date(),
  },
  {
    id:"aaaaaaaa-aaaa-0a0a-000a-000000000003",
    user_id: users[1].id,
    monster_id: monsters[0].id,
    acquired_at: new Date(),
  }
    ]

module.exports = {
  users,
  customers,
  invoices,
  revenue,
  coupons,
  monsters,
  user_monsters
};
