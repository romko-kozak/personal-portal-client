import BaseAPI from 'services/base-api';

const UsersAPI = BaseAPI.injectEndpoints({
  reducerPath: 'users',
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({url: 'users'}),
      providesTags: () => ['Users']
    }),
    getUserDetails: build.query({
      query: (id) => ({url: `users/${id}`}),
      providesTags: () => ['Users']
    }),
    createUser: build.mutation({
      query: (user) => ({
        url: `users`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: [{type: 'Users'}]
    }),
    updateUserDetails: build.mutation({
      query: ({id, formData}) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: formData
      }),
      invalidatesTags: [{type: 'Users'}]
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'Users'}]
    })
  })
});

export const {
  reducer,
  middleware,
  reducerPath,
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
  useCreateUserMutation,
  useUpdateUserDetailsMutation,
  useDeleteUserMutation
} = UsersAPI;