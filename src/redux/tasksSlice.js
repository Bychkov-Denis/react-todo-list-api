import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { todoService } from '../services/todoService';

const initialState = {
  tasks: [],
  error: null,
  loading: false,
  newTaskTitle: '',
  editingTaskId: null,
  editingTaskTitle: '',
  filter: 'all',
};

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await todoService.getAll();
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (newTaskTitle, { rejectWithValue }) => {
    if (!newTaskTitle.trim()) {
      toast.error('Название задачи не может быть пустым');
      return rejectWithValue('Название задачи не может быть пустым');
    }

    try {
      const { data } = await todoService.create({ title: newTaskTitle });
      toast.success('Задача успешно добавлена');
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const changeIsTaskCompleted = createAsyncThunk(
  'tasks/changeIsTaskCompleted',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await todoService.updateIsCompleted(id);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setNewTaskTitle(state, action) {
      state.newTaskTitle = action.payload;
    },
    setEditingTaskId(state, action) {
      state.editingTaskId = action.payload;
    },
    setEditingTaskTitle(state, action) {
      state.editingTaskTitle = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
      state.newTaskTitle = '';
    });
    builder.addCase(changeIsTaskCompleted.fulfilled, (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task,
      );
    });
    builder.addMatcher(isFulfilled, state => {
      state.loading = false;
    });
    builder.addMatcher(isPending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });
  },
  selectors: {
    selectTasks: state => state.tasks,
    selectNewTaskTitle: state => state.newTaskTitle,
    selectLoading: state => state.loading,
    selectEditingTaskId: state => state.editingTaskId,
    selectEditingTaskTitle: state => state.editingTaskTitle,
    selectFilter: state => state.filter,
    selectFilteredTasks: state => {
      const tasks = state.tasks;
      const filter = state.filter;

      switch (filter) {
        case 'active':
          return tasks.filter(task => !task.isCompleted);
        case 'completed':
          return tasks.filter(task => task.isCompleted);
        default:
          return tasks;
      }
    },
  },
});

export const {
  setNewTaskTitle,
  setEditingTaskTitle,
  setEditingTaskId,
  setFilter,
} = tasksSlice.actions;

export const {
  selectTasks,
  selectNewTaskTitle,
  selectLoading,
  selectEditingTaskId,
  selectEditingTaskTitle,
  selectFilteredTasks,
  selectFilter,
} = tasksSlice.selectors;

export default tasksSlice.reducer;
