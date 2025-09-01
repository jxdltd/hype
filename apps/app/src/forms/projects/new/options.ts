import { formOptions } from "@tanstack/react-form";
import z from "zod";

export const formSchema = z.object({
  name: z.string().min(3),
});

export const formOpts = formOptions({
  defaultValues: {
    name: "",
  },
  validators: {
    onChange: formSchema,
  },
});
