import * as z from "zod";

export const InputValidation = z.object({
  yt_url: z.string().url().optional(),
  file: z.string().optional(),
});
