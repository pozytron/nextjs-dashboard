'use server'; // this makes all the exported functions within the file as server functions.
// NOTE maybe it would be a good idea to move them later into a separate files

import {z} from "zod";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import bcrypt from "bcrypt";


//  AUTHENTICATION

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
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
    console.log("Updating invoice....")
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
})

const CreateUserSchema = UserFormSchema.omit({id: true})

type UserFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
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
        })
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.'
        }
    }
    console.log({validatedFields})
    const { email, name ,password} = validatedFields.data;
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

const UpdateUserSchema = UserFormSchema.omit({id: true})

export async function updateUser(id: string, prevState:UserFormState, formData: FormData) {
    console.log("Updating user....")
    const validatedFields = UpdateUserSchema.safeParse(
        {
            name: formData.get('name'),
            email: formData.get('email'),
        }
    )
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update User.'
        }
    }

    const { email, name } = validatedFields.data;
    try {
        await sql`
UPDATE users
SET name = ${name}, email = ${email}
WHERE id = ${id}`


    } catch (error) {
        return {message: 'Database Error: Failed to Update User.'};
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}