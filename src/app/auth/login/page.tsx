"use client";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { EyeOff } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";

const formSchema = z.object({
    email: z.string()
        .email({ message: 'Please enter a valid email address' })
        .min(2, { message: "Email must be atleast 2 characters" })
        .max(25, { message: "Email must not exceed 25 characters" }),
    password: z.string()
        .min(8, { message: "Password must be atleast 8 characters" })
        .max(50, { message: "Password must not exceed 50 characters" })
});
export default function Login() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            body: JSON.stringify(values),
        })
        if (response.status === 200)
            router.replace("/")
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="email" {...field} />
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
                                    <Input type={showPassword ? 'text' : 'password'} placeholder="password" {...field}/>

                                </FormControl>
                                <EyeOff className=" cursor-pointer"/>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )


}