'use server'; // this makes all the exported functions within the file as server functions.
// NOTE maybe it would be a good idea to move them later into a separate files

import {z} from "zod";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({invalid_type_error: "please select a customer"}),
    amount: z.coerce.number().gt(0, {message: "Please enter an amount greater than 0"}),
    status: z.enum(['paid', 'pending'],{
        invalid_type_error: "Please select an invoice status",
    }),
    date: z.string(),
})

const CreateInvoice = FormSchema.omit({id: true, date: true})

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    }
    message?: string | null

}

export async function createInvoice(prevState:State, formData: FormData) {
    console.log("Creating invoice....")
    const validatedFields = CreateInvoice.safeParse(
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

const UpdateInvoice = FormSchema.omit({id: true, date: true})

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
export async function deleteCustomer(id: string) {
    try {
        await sql`DELETE FROM customers WHERE id = ${id}`
        revalidatePath('/dashboard/customers');

    } catch (error) {
        return {message: 'Database Error: Failed to Delete Customer.'};
    }
}


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