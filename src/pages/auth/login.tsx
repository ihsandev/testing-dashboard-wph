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
  password: string;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput<FormValues>
            form={form}
            name="email"
            label="Email"
            placeholder="Input your email"
          />
          <div className="space-y-2">
            <FormInput<FormValues>
              form={form}
              name="password"
              label="Password"
              type="password"
              placeholder="Input your password"
            />
            <Link
              to="/auth/forgot-password"
              className="flex justify-end text-sm text-wph-primary-200"
            >
              Forgot Password?
            </Link>
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
