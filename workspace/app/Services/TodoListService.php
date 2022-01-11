<?php

namespace App\Services;

use App\Models\Todo_list;
use App\Models\Task;
use App\Models\Project;

class TodoListService
{
    public function show($id)
    {
        $projects = Project::with('taskss')->find($id);
        $tasks = $projects->tasks;
        $todos = [];
        $users=[];
        foreach ($tasks as $task){
            $todo = $task::with('todoLists')->find($task->id);
            $user = $task::with('users')->find($task->id);
            array_push($todos, $todo);
            array_push($users, $user);
         }
        unset($projects->taskss);
        $projects->todos = $todos;
        $projects->users = $users;
        return $projects;
    }
    public function store($request)
    {
        $todo = $request->only(['description', 'complete', 'id_task']);

        return Todo_list::create($todo);
    }
    public function destroy($id)
    {
        $todo = Todo_list::find($id);
        $todo->delete();

        return $id;
    }
    public function update($request, $id)
    {
        $updateTodo = $request->only(['description', 'complete']);
        $todo = Todo_list::find($id);
        $todo->update($updateTodo);
        return $todo;
    }
}
