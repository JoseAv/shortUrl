import type z from "zod";
import type { validateUrl } from "../schema/validateData.js";

// validation de url y tipo de url desde zod
export type typeUrl = z.infer<typeof validateUrl>;
