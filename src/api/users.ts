import { invoke } from '@tauri-apps/api';

interface Result {
  success: boolean;
  error?: string;
}

export async function createUser(name: string, password: string): Promise<Result> {
  try {
    await invoke('plugin:sqlite|execute', {
      query: 'INSERT INTO users (name, password) VALUES (?, ?)',
      values: [name, password]
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function authorizeUser(name: string, password: string): Promise<Result> {
  try {
    const result = await invoke('plugin:sqlite|query', {
      query: 'SELECT * FROM users WHERE name = ? AND password = ?',
      values: [name, password]
    });
    if ((result as any[]).length > 0) {
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

