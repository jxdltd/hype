import { formOptions } from "@tanstack/react-form";
import { z } from "zod";

export const formSchema = z.object({
  email: z.email("Provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const formOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});
