import { supabase } from "@/api/supabase";
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
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          updateCachedData(() => session);
        });

        await cacheEntryRemoved;
        subscription.unsubscribe();
      },
    }),
  }),
});

export const { useGetSessionQuery } = authApi;
