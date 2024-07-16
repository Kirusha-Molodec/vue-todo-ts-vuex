<script setup lang="ts">
import { PropType, defineProps, ref } from 'vue';
import {useStore } from 'vuex';

const props = defineProps({
    todo: {
        type: Object as PropType<{id: number, text: string, completed: boolean, edit: boolean}>,
        required: true
    },
})

const editTodoText = ref("");

const store = useStore()

const removeTodo = (id: number) => {
    store.dispatch('deleteTodoAction', id)
}

const completeTodo = (id: number) => {
    store.dispatch('completeTodoAction', id)
}

const openEdit = (id: number) => {
    store.dispatch('openEditAction', id);
    editTodoText.value = props.todo.text
}

const editTodo = (id:number, editText: string) => {
    editText = editTodoText.value
    store.dispatch('editTodoAction', {id, editText})
}


</script>

<template>
    <li class="w-80 flex m-auto bg-red-400 text-white rounded p-3 mb-3 justify-between cursor-pointer" :class="{'bg-green-400-important': todo.completed}">
        <span v-if="!todo.edit" @click="openEdit(todo.id)">🖊️</span>
        <p @click="completeTodo(todo.id)" v-if="!todo.edit" >{{ todo.text }}</p>
        <input v-model="editTodoText" @keyup.enter="editTodo(todo.id, editTodoText)" v-else type="text" placeholder="Edit Todo" class="text-black">
        <span @click="removeTodo(todo.id)" class="cursor-pointer">🗑️</span>
    </li>
</template>