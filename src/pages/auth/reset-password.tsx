import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInput } from "@/components/elements/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AuthLayout from "@/layouts/auth-layout";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const formSchema = z
  .object({
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
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <AuthLayout title="Reset Password" isFormOnly>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput<FormValues>
            form={form}
            name="password"
            label="New Password"
            type="password"
            placeholder="Input new password"
          />
          <FormInput<FormValues>
            form={form}
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Input confirm new password"
          />
          <Button className="w-full" type="submit">
            Reset Password
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
