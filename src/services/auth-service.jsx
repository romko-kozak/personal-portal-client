import BaseAPI from 'services/base-api';

const AuthAPI = BaseAPI.injectEndpoints({
  reducerPath: 'auth',
  tagTypes: ['Auth', 'Users'],
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (user) => ({
        url: `auth/sign-up`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: [{type: 'Users'}]
    }),
    signIn: build.mutation({
      query: (credentials) => ({
        url: `auth/sign-in`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: [{type: 'Auth'}]
    }),
    signOut: build.mutation({
      query: () => ({
        url: `auth/sign-out`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: [{type: 'Auth'}]
    }),
    checkAuthStatus: build.query({
      query: () => ({url: 'auth'}),
      providesTags: () => ['Auth']
    }),
    verifyUser: build.mutation({
      query: (code) => code ? ({
        url: `auth/confirm/${code}`,
        method: 'POST'
      }) : null
    })
  })
});

export const {
  reducer,
  middleware,
  reducerPath,
  endpoints,
  useCheckAuthStatusQuery,
  useVerifyUserMutation,
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation
} = AuthAPI;