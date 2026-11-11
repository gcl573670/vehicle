import { createServerFn } from "@tanstack/react-start";
import { getVehicleBySlug } from "@/lib/autospec.functions";

export const GET = createServerFn({ method: "GET" })
  .validator((input: { id: string }) => ({ id: input.id }))
  .handler(async ({ data }) => {
    const result = await getVehicleBySlug({ data: { slug: data.id } });
    return result;
  });
