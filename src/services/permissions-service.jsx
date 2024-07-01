import BaseAPI from 'services/base-api';

const PermissionsAPI = BaseAPI.injectEndpoints({
  reducerPath: 'permissions',
  tagTypes: ['Permissions'],
  endpoints: (build) => ({
    getAllPermissions: build.query({
      query: () => ({url: 'permissions'}),
      providesTags: () => ['Permissions']
    }),
    getUserPermissions: build.query({
      query: ({userId}) => ({url: `permissions/${userId}`}),
      providesTags: () => ['UserPermissions']
    }),
    assignPermissionToUser: build.mutation({
      query: ({id, userId, assign}) => ({
        url: `permissions/${userId}`,
        method: 'POST',
        body: {id, assign}
      }),
      invalidatesTags: [{type: 'UserPermissions'}]
    })
  })
});

export const {
  reducer: PermissionsReducer,
  middleware: PermissionsMiddleware,
  reducerPath: PermissionsReducerPath,
  useGetAllPermissionsQuery,
  useGetUserPermissionsQuery,
  useAssignPermissionToUserMutation
} = PermissionsAPI;