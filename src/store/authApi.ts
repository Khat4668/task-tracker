import { supabase } from "@/api/supabase";
import { issuesApi } from "@/store/issuesApi";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Session } from "@supabase/supabase-js";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getSession: builder.query<Session | null, void>({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) return { error };
        return { data: data.session };
      },
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch },
      ) {
        await cacheDataLoaded;

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          updateCachedData(() => session);

          if (event === "SIGNED_OUT") dispatch(issuesApi.util.resetApiState());
        });

        await cacheEntryRemoved;
        subscription.unsubscribe();
      },
    }),
  }),
});

export const { useGetSessionQuery } = authApi;
