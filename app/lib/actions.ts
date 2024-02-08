'use server'; // this makes all the exported functions within the file as server functions.
// NOTE maybe it would be a good idea to move them later into a separate files

import {z} from "zod";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {config} from "@/auth";
import {AuthError} from "next-auth";
import bcrypt from "bcrypt";
import {fetchCoupon, markCouponAsRedeemed} from "@/app/lib/data/coupons";
import {fetchRandomActiveMonster} from "@/app/lib/data/monsters";
import {addUserMonsterWithCoupon} from "@/app/lib/data/user_monsters";
import {Monster} from "@/app/ui/cards/CardsRedeem";


//  AUTHENTICATION

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await config.signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials. None shall pass!';
                default:
                    return 'WTF? Something went wrong.';
            }
        }
        throw error;
    }
}


const InvoiceFormSchema = z.object({
    id: z.string(),
    customerId: z.string({invalid_type_error: "please select a customer"}),
    amount: z.coerce.number().gt(0, {message: "Please enter an amount greater than 0"}),
    status: z.enum(['paid', 'pending'],{
        invalid_type_error: "Please select an invoice status",
    }),
    date: z.string(),
})
const CreateInvoiceSchema = InvoiceFormSchema.omit({id: true, date: true})

type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    }
    message?: string | null

}

export async function createInvoice(prevState:State, formData: FormData) {
    console.log("Creating invoice....")
    const validatedFields = CreateInvoiceSchema.safeParse(
        {
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        }
    )
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.'
        }
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];


    try {
        await sql`
            INSERT INTO invoices (customer_id,amount,status,date)
            VALUES (${customerId},${amountInCents},${status},${date})
            `;

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

const UpdateInvoice = InvoiceFormSchema.omit({id: true, date: true})

export async function updateInvoice(id: string,prevState:State, formData: FormData) {
    console.log("Updating invoice....")
    const validatedFields = UpdateInvoice.safeParse(
        {
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        }
    )
    if(!validatedFields.success){
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.'
    }
    }

    const {customerId, amount, status} = validatedFields.data
    const amountInCents = amount * 100;

    try {
        await sql`
UPDATE invoices
SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
WHERE id = ${id}`


    } catch (error) {
        return {message: 'Database Error: Failed to Update Invoice.'};
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`
        revalidatePath('/dashboard/invoices');

    } catch (error) {
        return {message: 'Database Error: Failed to Delete Invoice.'};
    }
}


// CUSTOMERS


const CustomerFormSchema = z.object({
    id:z.string(),
    name: z.string().min(1, {message: "Please enter a customer name"}),
    email: z.string().min(1, {message: "Please enter a customer email"}),
})

const CreateCustomerSchema = CustomerFormSchema.omit({id: true})

type CustomerState = {
    errors?: {
        name?: string[];
        email?: string[];
    }
    message?: string | null

}

export async function createCustomer(prevState:CustomerState, formData:FormData) {
    console.log("Creating customer....")
    const validatedFields = CreateCustomerSchema.safeParse(
        {
        name: formData.get('name'),
        email: formData.get('email'),
    })
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.'
        }
    }
    console.log({validatedFields})
    const { email, name } = validatedFields.data;
    const image_url = 'https://i.pravatar.cc/300';
    try {
        await sql`
            INSERT INTO customers (name, email,image_url)
            VALUES (${name},${email},${image_url})
            `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Create Customer.',
        };
    }
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}
export async function deleteCustomer(id: string) {
    try {
        await sql`DELETE FROM customers WHERE id = ${id}`
        revalidatePath('/dashboard/customers');

    } catch (error) {
        return {message: 'Database Error: Failed to Delete Customer.'};
    }
}

const UpdateCustomer = CustomerFormSchema.omit({id: true})

export async function updateCustomer(id: string,prevState:CustomerState, formData: FormData) {
    console.log("Updating customer....")
    const validatedFields = UpdateCustomer.safeParse(
        {
            name: formData.get('name'),
            email: formData.get('email'),
        }
    )
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Customer.'
        }
    }

    const { email, name } = validatedFields.data;
    try {
        await sql`
UPDATE customers
SET name = ${name}, email = ${email}
WHERE id = ${id}`


    } catch (error) {
        return {message: 'Database Error: Failed to Update Customer.'};
    }
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

//  ***********************   USERS   ***********************

const UserFormSchema = z.object({
    id:z.string(),
    name: z.string().min(1, {message: "Please enter a user name"}),
    email: z.string().min(1, {message: "Please enter a user email"}),
    password: z.string().min(1, {message: "Please enter a user password"}),
    passwordAgain: z.string().min(1, {message: "Please enter a user password"}),
    is_admin: z.boolean(),
    is_active: z.boolean()
})

const CreateUserSchema = UserFormSchema.omit({id: true})

type UserFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        passwordAgain?: string[];
        is_admin?: string[];
        is_active?: string[];
    }
    message?: string | null

}

export async function createUser(prevState:UserFormState, formData:FormData) {
    console.log("Creating user....")
    const validatedFields = CreateUserSchema.safeParse(
        {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            passwordAgain: formData.get('passwordAgain'),
            is_admin: formData.get('is_admin') === 'true',
            is_active: formData.get('is_active') === 'true',
        })
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.'
        }
    }
    const { email, name ,password,is_admin,is_active} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await sql`
            INSERT INTO users (name, email,password,is_admin,is_active)
            VALUES (${name},${email},${hashedPassword},${is_admin},${is_active})
            `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Create User.',
        };
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}
export async function deleteUser(id: string) {

    try {
        await sql`DELETE FROM customers WHERE id = ${id}`
        revalidatePath('/dashboard/users');

    } catch (error) {
        return {message: 'Database Error: Failed to Delete Customer.'};
    }
}

const RegisterUserSchema = UserFormSchema
    .omit({id: true,is_active: true,is_admin: true})
    .refine(data => data.password === data.passwordAgain, {
    message: "Passwords don't match",
    path: ["passwordAgain"],
});

export async function registerUser(prevState:UserFormState, formData:FormData) {
    console.log("Register user....")
    const validatedFields = RegisterUserSchema.safeParse(
        {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            passwordAgain: formData.get('passwordAgain'),
        })

    if(!validatedFields.success){
        console.log({validatedFields})
        console.log(validatedFields.error)

        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.'
        }
    }
    console.log({validatedFields})
    const { email, name ,password,passwordAgain} = validatedFields.data;


    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await sql`
            INSERT INTO users (name, email,password)
            VALUES (${name},${email},${hashedPassword})
            `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Create User.',
        };
    }
    redirect('/login');
}

const UpdateUserSchema = UserFormSchema.omit({id: true,password:true,passwordAgain:true})

export async function updateUser(id: string, prevState:UserFormState, formData: FormData) {
    console.log("Updating user....")
    const validatedFields = UpdateUserSchema.safeParse(
        {
            name: formData.get('name'),
            email: formData.get('email'),
            is_admin: formData.get('is_admin') === 'true',
            is_active: formData.get('is_active') === 'true',
        }
    )
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update User.'
        }
    }

    const { email, name,is_admin,is_active } = validatedFields.data;
    try {
        await sql`
UPDATE users
SET name = ${name}, email = ${email},is_admin = ${is_admin},is_active = ${is_active}
WHERE id = ${id}`


    } catch (error) {
        return {message: 'Database Error: Failed to Update User.'};
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

// ***************************************************************************
// COUPONS
// ***************************************************************************

type CouponState = {
    errors?: {
        code?: string[];
        description?: string[];
    }
    message?: string | null

}

const CouponFormSchema = z.object({
    id: z.string(),
    code: z.string().regex(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, { message: "Code must be in format XXXX-XXXX-XXXX" }),
    description: z.string(),
})
const CreateCouponSchema = CouponFormSchema.omit({id: true})

export async function createCoupon(prevState:CouponState, formData: FormData) {
    console.log("Creating coupon....")
    const validatedFields = CreateCouponSchema.safeParse(
        {
            code: formData.get('code'),
            description: formData.get('description'),
        }
    )
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Coupon.'
        }
    }

    const { code,description } = validatedFields.data;

    try {
        await sql`
            INSERT INTO coupons (code,description)
            VALUES (${code},${description})
            `;

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Coupon.',
        };
    }
    revalidatePath('/dashboard/coupons');
    redirect('/dashboard/coupons');
}

type CouponRedeemState = {
    monster: any;
    is_success: boolean;
    errors?: {
        code?: string[];
    }
    message?: string | null

}
const RedeemCouponSchema = z.object({
    userId: z.string(),
    code: z.string().regex(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, { message: "Code must be in format XXXX-XXXX-XXXX" }),
})

export async function redeemCoupon(prevState:CouponRedeemState, formData:FormData) {
    console.log("Redeeming coupon....")
    const validatedFields = RedeemCouponSchema.safeParse(
        {
            code: formData.get('code'),
            userId:formData.get('userId')
        })
    if(!validatedFields.success){
        return {
            is_success: false,
            monster:null,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Monster.'
        }
    }
    const { code, userId } = validatedFields.data;
    console.log({code,userId})
    try {
     const coupon = await fetchCoupon(code);
        if(!coupon){
            return {
                is_success: false,
                monster:null,
                errors:{
                    code: ['Invalid Coupon Code']
                },
                message: 'Invalid Coupon Code',
            };
        }
        if(coupon.redeem_timestamp!==null){
            return {
                is_success: false,
                monster:null,
                errors:{
                    code: ['Coupon already redeemed']
                },
                message: 'Coupon already redeemed',
            }
            }
        const randomActiveMonster = await fetchRandomActiveMonster();
        console.log(randomActiveMonster.name)

        await addUserMonsterWithCoupon(userId, randomActiveMonster.id, coupon.id);
        await markCouponAsRedeemed(userId, coupon.id);
        return {
            is_success: true,
            monster: randomActiveMonster,
            message: `Coupon redeemed: ${coupon.code}`,
        };

    } catch (error) {
        console.log(error)
        return {
            is_success: false,
            monster:null,
            message: 'Database Error: Failed to Redeem Coupon.',
        };
    }
}


// ***************************************************************************
//                              MONSTERS
// ***************************************************************************

type MonsterState = {
    errors?: {
        name?: string[];
        power?: string[];
        image?: string[];
        planet?: string[];
        team?: string[];
        is_active?: string[];
    }
    message?: string | null
}


const MonsterFormSchema = z.object({
    id:z.string(),
    name: z.string().min(1, {message: "Please enter a monster name"}),
    power: z.coerce.number().gt(0, {message: "Please enter an amount greater than 0"}),
    image: z.string().min(1, {message: "Please enter url for image"}),
    planet: z.string().min(1, {message: "Please enter url for planet"}),
    team: z.string().min(1, {message: "Please provide team"}),
    is_active: z.boolean(),
})

const MonsterSchema = MonsterFormSchema.omit({id: true})

export async function createMonster(prevState:MonsterState, formData:FormData) {
    console.log("Creating monster....")
    const validatedFields = MonsterSchema.safeParse(
        {
            name: formData.get('name'),
            power: formData.get('power'),
            image: formData.get('image'),
            planet: formData.get('planet'),
            team: formData.get('team'),
            is_active: formData.get('is_active') === 'true'
        })
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Monster.'
        }
    }
    const { name,power,image,planet,team,is_active } = validatedFields.data;
    try {
        await sql`
            INSERT INTO monsters (name, power, image,planet,team,is_active)
            VALUES (${name},${power},${image},${planet},${team},${is_active})
            `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Create Monster.',
        };
    }
    revalidatePath('/dashboard/monsters');
    redirect('/dashboard/monsters');
}

export async function updateMonster(id: string,prevState:MonsterState, formData: FormData) {
    console.log("Updating monster....")
    const validatedFields = MonsterSchema.safeParse(
        {
            name: formData.get('name'),
            power: formData.get('power'),
            image: formData.get('image'),
            planet: formData.get('planet'),
            team: formData.get('team'),
            is_active: Boolean(formData.get('is_active'))
        }
    )
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Monster.'
        }
    }

    const { name,power,image,planet,team,is_active } = validatedFields.data;
    try {
        await sql`
UPDATE monsters
SET name = ${name}, power = ${power}, image = ${image},planet = ${planet},team = ${team},is_active = ${is_active}, updated_at = NOW()
WHERE id = ${id}`

    } catch (error) {
        console.log({error})
        return {message: 'Database Error: Failed to Update Monster.'};
    }
    revalidatePath('/dashboard/monsters');
    redirect('/dashboard/monsters');
}

