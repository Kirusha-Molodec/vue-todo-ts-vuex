import { createStore } from 'vuex'
import { Todo, editPayload } from '@/types/todo'

interface State {
  todos: Todo[]
}

export default createStore<State>({
  state: {
    todos: []
  },
  getters: {
    todos: state => state.todos
  },
  mutations: {
    addTodo(state, todo: Todo) {
      state.todos.push(todo)
    },
    removeTodo(state, id:number) {
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
    completeTodo(state, id:number) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    editTodo(state, payload: editPayload) {
      const {id, editText} = payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = editText;
        todo.edit = false
      }
    },
    openEdit(state, id: number) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.edit = true
      }
    }
  },
  actions: {
    addTodoAction({commit}, todo: Todo) {
      commit('addTodo', todo)
    },
    deleteTodoAction({commit}, id: number) {
      commit('removeTodo', id)
    },
    completeTodoAction({commit}, id: number) {
      commit('completeTodo', id)
    },
    editTodoAction({commit}, payload: editPayload) {
      const {id, editText} = payload;
      commit('editTodo', {id, editText})
    },
    openEditAction({commit}, id: number) {
      commit('openEdit', id)
    }
  },
  modules: {
  }
})
