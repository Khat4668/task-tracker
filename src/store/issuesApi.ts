import { createIssue, getIssues, updateIssue } from "@/api/issues";
import type { IssueFormData } from "@/components/CreateIssueModal/schema";
import type { Issue, Status } from "@/types";
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
    updateIssue: builder.mutation<Issue, { id: string; status: Status }>({
      queryFn: async ({ id, status }) => {
        try {
          const data = await updateIssue(id, status);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          issuesApi.util.updateQueryData("getIssues", undefined, (draft) => {
            const issue = draft.find((i) => i.id === id);
            if (issue) Object.assign(issue, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetIssuesQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
} = issuesApi;
