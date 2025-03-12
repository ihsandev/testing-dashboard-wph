import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInput } from "@/components/elements/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AuthLayout from "@/layouts/auth-layout";
import { Link } from "@tanstack/react-router";

type FormValues = {
  email: string;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Invalid email format" }),
});

export default function ForgotPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <AuthLayout title="Forgot Password" isFormOnly>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput<FormValues>
            form={form}
            name="email"
            label="Email"
            placeholder="Input your email"
          />
          <Button className="w-full" type="submit">
            Reset Password
          </Button>
          <Button asChild variant="ghost" className="w-full" type="submit">
            <Link to="/auth/login">Back to login</Link>
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
