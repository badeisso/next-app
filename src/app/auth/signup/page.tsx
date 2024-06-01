"use client";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(8, {
        message: "Password must be atleast 8 characters"
    }).max(50, {
        message: "Password must not exceed 50 characters"
    }),
    username: z.string().min(2, {
        message: "Username must be atleast 2 characters"
    }).max(20, {
        message: "Username  must not exceed 20 characters"
    })
});
export default function Signup() {

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
            method: 'POST',
            body: JSON.stringify(values),
        })
        if (response.status === 200)
            router.replace("/auth/login")
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    return (
        <div className="flex flex-col w-full justify-center content-center h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-2/6 bg-slate-200 p-5 space-y-8 border-solid border-slate-400 border rounded-md justify-center self-center">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sign-up</Button>
                </form>
            </Form>
        </div>
    )


}