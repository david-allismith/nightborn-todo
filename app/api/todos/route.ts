import { NextRequest, NextResponse } from 'next/server';
import { todos } from './data';
import { Todo } from '@/types/todo';
import { v4 as uuid } from 'uuid';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sortBy = (searchParams.get('sortBy') || 'date') as 'date' | 'alphabetical';
    const order = (searchParams.get('order') || 'newest') as 'newest' | 'oldest' | 'asc' | 'desc';

    const sortedTodos = [...todos];
    if (sortBy === 'date') {
      sortedTodos.sort((first, second) => {
        const firstTimestamp = new Date(first.createdAt).getTime();
        const secondTimestamp = new Date(second.createdAt).getTime();
        return order === 'newest' ? secondTimestamp - firstTimestamp : firstTimestamp - secondTimestamp;
      });
    } else if (sortBy === 'alphabetical') {
      sortedTodos.sort((first, second) => {
        const firstTitle = first.title.toLowerCase();
        const secondTitle = second.title.toLowerCase();
        const isAscending = order === 'asc' || order === 'newest';
        return isAscending 
          ? firstTitle.localeCompare(secondTitle)
          : secondTitle.localeCompare(firstTitle);
      });
    }

    return NextResponse.json(sortedTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const title = requestBody.title?.trim();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: uuid(),
      title,
      description: requestBody.description?.trim() || '',
      completed: requestBody.completed === true,
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
