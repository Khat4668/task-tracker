import { getIssues } from "@/api/issues";
import type { Issue } from "@/types";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const issuesApi = createApi({
  reducerPath: "issuesApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getIssues: builder.query<Issue[], void>({
      queryFn: async () => {
        try {
          const data = await getIssues();
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetIssuesQuery } = issuesApi;
