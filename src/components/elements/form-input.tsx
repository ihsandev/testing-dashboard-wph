import { Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>; // Changed from keyof TFormValues to Path<TFormValues>
  label?: string;
  placeholder?: string;
  description?: string;
  type?: HTMLInputElement["type"];
}

export const FormInput = <TFormValues extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder,
  description,
  type,
}: FormInputProps<TFormValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3.5">
          {label && (
            <FormLabel className="text-wph-neutral-25 text-sm font-normal">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              type={type}
              value={field.value as string}
              placeholder={placeholder}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
