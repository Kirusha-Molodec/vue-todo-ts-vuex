<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import { ref,computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const newTodoText = ref("");
const todos = computed(() => store.getters.todos);

const addTodo = () => {
    if (newTodoText.value.trim() !== '') {
        const newTodo = {
            id: Date.now(),
            text: newTodoText.value,
            completed: false,
            edit: false
        };
        store.dispatch('addTodoAction', newTodo);
        newTodoText.value = "";
    }
}

</script>

<template>
    <div class="mt-5 mb-5 flex justify-center m-auto">
        <div class="flex gap-2">
            <input v-model="newTodoText" type="text" placeholder="Enter a todo" class="p-2 w-full border-gray-800 border-2 w-80 rounded outline-none">
            <button @click="addTodo" class="p-2 bg-cyan-700 text-white rounded">Add Task</button>
        </div>
    </div>
    <ul>
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
</template>
