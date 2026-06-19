import { createIssue, getIssues } from "@/api/issues";
import type { IssueFormData } from "@/components/CreateIssueModal/schema";
import type { Issue } from "@/types";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const issuesApi = createApi({
  reducerPath: "issuesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Issues"],
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
      providesTags: ["Issues"],
    }),
    createIssue: builder.mutation<Issue, IssueFormData>({
      queryFn: async (issue) => {
        try {
          const data = await createIssue(issue);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Issues"],
    }),
  }),
});

export const { useGetIssuesQuery, useCreateIssueMutation } = issuesApi;
