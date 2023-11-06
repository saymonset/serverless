import  { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const todosApi = createApi({
 
    reducerPath: 'todos',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://4p1bw1ybo5.execute-api.us-east-1.amazonaws.com/docs'
    }),

    endpoints: (builder) => ({
       
        getTodos: builder.query({
            query: () => '/ads/2/0'
        }),
        getTodoById: builder.query({
            query: (_id) => '/ads/${ _id }'
        }),
    })
})


export const { useGetTodosQuery, useGetTodoByIdQuery } = todosApi;