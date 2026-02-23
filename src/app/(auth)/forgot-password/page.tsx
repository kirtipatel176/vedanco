import { Suspense } from "react";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export const metadata = {
    title: "Forgot Password | Vedanco",
    description: "Recover your Vedanco account password",
};

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordForm />
        </Suspense>
    );
}
