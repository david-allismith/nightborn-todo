'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TodoForm from '@/components/TodoForm';
import { createTodo } from '@/lib/api-client';
import { QUERY_KEYS, ROUTES } from '@/lib/constants';
import { Todo } from '@/types/todo';
import PageLayout from '@/components/PageLayout';
import BackButton from '@/components/BackButton';
import SuccessMessage from '@/components/SuccessMessage';
import ErrorMessage from '@/components/ErrorMessage';

export default function CreateTodoPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<Todo, Error, Omit<Todo, 'id' | 'createdAt'>>({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
      // Show success message briefly, then redirect
      setTimeout(() => {
        router.push(ROUTES.TODO_DETAIL(newTodo.id));
      }, 500);
    },
    onError: (error: Error) => {
      console.error('Failed to create todo:', error);
      alert(`Failed to create todo: ${error.message}`);
    },
  });

  return (
    <PageLayout maxWidth="3xl">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <BackButton />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
          Create New Todo
        </h1>
        <p className="text-lg sm:text-xl text-purple-200 font-medium">
          Fill in the details below to create a new todo item.
        </p>
      </div>

      {/* Success Message */}
      {mutation.isSuccess && (
        <div className="mb-6">
          <SuccessMessage message="Todo created successfully! Redirecting..." />
        </div>
      )}

      {/* Error Message */}
      {mutation.isError && (
        <div className="mb-6">
          <ErrorMessage message={mutation.error.message} />
        </div>
      )}

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 lg:p-12">
          <TodoForm
            onSubmit={(data) => mutation.mutate(data)}
            isLoading={mutation.isPending}
            submitLabel="Create Todo"
          />
        </div>
    </PageLayout>
  );
}
