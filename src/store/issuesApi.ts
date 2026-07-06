import type { UpdateIssueParams } from "@/api/issues";
import { createIssue, deleteIssue, getIssues, updateIssue } from "@/api/issues";
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
    updateIssue: builder.mutation<Issue, UpdateIssueParams>({
      queryFn: async (params) => {
        try {
          const data = await updateIssue(params);
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
    deleteIssue: builder.mutation<void, string>({
      queryFn: async (id) => {
        try {
          await deleteIssue(id);
          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Issues"],
    }),
  }),
});

export const {
  useGetIssuesQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
} = issuesApi;
