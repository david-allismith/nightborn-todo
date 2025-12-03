'use client';

import { useState, FormEvent } from 'react';
import { Todo } from '@/types/todo';

type Props = {
  initial?: Partial<Todo>;
  onSubmit: (data: Omit<Todo, 'id' | 'createdAt'>) => void;
  isLoading?: boolean;
  submitLabel?: string;
};

export default function TodoForm({
  initial = {},
  onSubmit,
  isLoading = false,
  submitLabel = 'Save',
}: Props) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [completed, setCompleted] = useState(initial.completed || false);
  const [titleError, setTitleError] = useState<string>('');

  const isDirty =
      title !== (initial.title || '') ||
      description !== (initial.description || '') ||
      completed !== (initial.completed || false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate title: required and must meet minimum length
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError('Title is required');
      return;
    }

    if (trimmedTitle.length < 3) {
      setTitleError('Title must be at least 3 characters long');
      return;
    }

    setTitleError('');

    // Submit cleaned data to parent handler once validation passes
    onSubmit({
      title: trimmedTitle,
      description: description.trim() || undefined,
      completed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title Field */}
      <div className="space-y-3">
        <label
          htmlFor="title"
          className="block text-base font-bold text-white mb-3"
        >
          Title <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            id="title"
            type="text"
            className={`w-full px-5 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 ${
              titleError
                ? 'border-red-400/50 bg-red-500/10 focus:border-red-400 focus:ring-red-500/50'
                : 'border-white/20 focus:border-purple-400/50'
            }`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);

              // Clear error message as the user corrects the title
              if (titleError) setTitleError('');
            }}
            placeholder="Enter a descriptive title for your todo"
            disabled={isLoading}
            aria-invalid={!!titleError}
            aria-describedby={titleError ? 'title-error' : undefined}
          />
          {title && !titleError && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {titleError && (
          <div className="flex items-center gap-2 mt-2">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p id="title-error" className="text-sm text-red-300 font-medium">
              {titleError}
            </p>
          </div>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-3">
        <label
          htmlFor="description"
          className="block text-base font-bold text-white mb-3"
        >
          Description <span className="text-purple-300 text-sm font-normal">(optional)</span>
        </label>
        <div className="relative">
          <textarea
            id="description"
            rows={5}
            className="w-full px-5 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about this todo item..."
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-purple-200/80 font-medium">
            {description.length} characters
          </p>
          {description.length > 0 && (
            <p className="text-xs text-purple-200/80 font-medium">
              {description.length > 200 ? 'Consider keeping it concise' : 'Looking good!'}
            </p>
          )}
        </div>
      </div>

      {/* Status Checkbox */}
      <div className="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-6">
        <label className="flex items-center gap-4 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={isLoading}
            />
            <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
              completed
                ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-400 shadow-lg shadow-green-500/50'
                : 'bg-white/10 border-white/30 group-hover:border-purple-400/50'
            }`}>
              {completed && (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <div className="flex-1">
            <span className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
              Mark as completed
            </span>
            <p className="text-sm text-purple-200/70 mt-1">
              Check this if the task is already done
            </p>
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !isDirty}
        className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold px-8 py-5 rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="animate-spin h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{submitLabel === 'Save' ? 'Saving...' : 'Creating...'}</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            {submitLabel}
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
}
