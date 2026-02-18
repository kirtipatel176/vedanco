"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
});

export function ValidationDemo() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast.success("Validation Successful", {
            description: "Your form has been submitted correctly.",
        });
    }

    function onError() {
        toast.error("Validation Failed", {
            description: "Please check the highlighted fields.",
        });
    }

    return (
        <Card className="bg-white/5 border-white/10 text-white max-w-md">
            <CardHeader>
                <CardTitle>Validation Demo</CardTitle>
                <CardDescription className="text-white/60">
                    Try submitting with empty fields to see validation errors and toasts.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                            id="email"
                            placeholder="hello@example.com"
                            {...form.register("email")}
                            className={form.formState.errors.email ? "border-red-500 focus-visible:border-red-500" : ""}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-white">Username</Label>
                        <Input
                            id="username"
                            placeholder="johndoe"
                            {...form.register("username")}
                            className={form.formState.errors.username ? "border-red-500 focus-visible:border-red-500" : ""}
                        />
                        {form.formState.errors.username && (
                            <p className="text-sm text-red-500">{form.formState.errors.username.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Submit Form
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
