export const ROUTES = {
  HOME: '/',
  CREATE_TODO: '/todo/create',
  TODO_DETAIL: (id: string) => `/todo/${id}`,
} as const;

export const QUERY_KEYS = {
  TODOS: ['todos'] as const,
  TODO: (id: string) => ['todo', id] as const,
} as const;

