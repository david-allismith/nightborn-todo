import { Todo } from '@/types/todo';

const API_BASE = '/api/todos';

export type SortBy = 'date' | 'alphabetical';
export type SortOrder = 'newest' | 'oldest' | 'asc' | 'desc';

export async function fetchTodos(sortBy: SortBy = 'date', order: SortOrder = 'newest'): Promise<Todo[]> {
  const params = new URLSearchParams({
    sortBy,
    order: order === 'newest' ? 'newest' : order === 'oldest' ? 'oldest' : order,
  });

  const response = await fetch(`${API_BASE}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchTodo(id: string): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Todo not found');
    }
    throw new Error(`Failed to fetch todo: ${response.statusText}`);
  }

  return response.json();
}

export async function createTodo(data: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.statusText}`);
  }

  return response.json();
}

export async function updateTodo(id: string, data: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Todo not found');
    }
    throw new Error(`Failed to update todo: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Todo not found');
    }
    throw new Error(`Failed to delete todo: ${response.statusText}`);
  }
}

