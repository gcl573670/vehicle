import { createServerFn } from "@tanstack/react-start";
import { searchVehicles } from "@/lib/autospec.functions";

export const GET = createServerFn({ method: "GET" })
  .validator((input: { page?: string; pageSize?: string; make?: string; model?: string; year?: string }) => {
    const page = input.page ? parseInt(input.page, 10) : 1;
    const pageSize = input.pageSize ? parseInt(input.pageSize, 10) : 20;
    return { page, pageSize, make: input.make, model: input.model, year: input.year ? parseInt(input.year, 10) : undefined };
  })
  .handler(async ({ data }) => {
    const result = await searchVehicles({ data: {
      page: data.page,
      pageSize: data.pageSize,
      make: data.make,
      model: data.model,
      year: data.year,
    } });
    return result;
  });
