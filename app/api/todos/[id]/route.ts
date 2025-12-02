import { NextRequest, NextResponse } from 'next/server';
import { todos } from '../data';
import { Todo } from '@/types/todo';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todo = todos.find((t) => t.id === id  );

    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    const requestBody = await req.json();
    const existingTodo = todos[todoIndex];

    const updatedTitle = requestBody.title?.trim();
    if (requestBody.title !== undefined && !updatedTitle) {
      return NextResponse.json(
        { error: 'Title cannot be empty' },
        { status: 400 }
      );
    }

    const updatedTodo: Todo = {
      ...existingTodo,
      title: updatedTitle ?? existingTodo.title,
      description: requestBody.description !== undefined
        ? requestBody.description.trim()
        : existingTodo.description,
      completed: requestBody.completed !== undefined
        ? requestBody.completed === true
        : existingTodo.completed,
    };

    todos[todoIndex] = updatedTodo;
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    todos.splice(todoIndex, 1);
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}

