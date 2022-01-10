<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Task;
use App\Models\Todo_list;
use App\Models\UserProjectTask;
use App\Services\ProjectsService;

class TasksService
{
    public $projectsService;
    public function __construct(ProjectsService $projectsService){
        $this->projectsService=$projectsService;
    }

    public function show($idTask)
    {
        $tasks = Task::with('todoLists')->with('comments')->with('users')->find($idTask);
        return $tasks;
    }

    public function store($request)
    {
        $task = Task::create($request->only(['name', 'id_category', 'id_project']));
        $user_project_task = UserProjectTask::create([
            'id_user' => auth('api')->user()->id,
            'id_project' => $request->id_project,
            'id_task' => $task->id,
        ]);
        return $task;
    }

    public function update($request, $id)
    {
        $updateTask = $request->only(['name']);
        $task = Task::find($id);
        $task->update($updateTask);
        return $task;
    }

    public function destroy($id)
    {
        Task::where('id', $id)->delete();
        Comment::where('id_task', $id)->delete();
        Todo_list::where('id_task', $id)->delete();
        UserProjectTask::where('id_task', $id)->delete();
        return $id;
    }
}
