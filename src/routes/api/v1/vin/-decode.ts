import { createServerFn } from "@tanstack/react-start";
import { decodeVin } from "@/lib/autospec.functions";

export const POST = createServerFn({ method: "POST" })
  .validator((input: { vin: string }) => ({ vin: input.vin }))
  .handler(async ({ data }) => {
    const result = await decodeVin({ data: { vin: data.vin } });
    return result;
  });
