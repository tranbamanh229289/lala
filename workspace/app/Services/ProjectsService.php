<?php

namespace App\Services;

use App\Models\Category;
use App\Models\User;
use App\Models\Project;
use App\Models\UserProject;
use App\Models\Task;
use App\Models\UserProjectTask;
use App\Models\Todo_list;
use App\Models\Comment;

class ProjectsService
{
    public function index()
    {
        $idUser = auth('api')->user()->id;
        $user = User::with('projects')->find($idUser);
        $projects = $user->projects;

        return $projects;
    }

    public function show($idProject)
    {
        $project= Project::with('users')->with('categories')->find($idProject);
        $categories = $project->categories;
        $ls = [];
        foreach($categories as $category){
            $tasks = $category->with('tasks')->find($category->id);
            array_push($ls, $tasks);
        }
        unset($project->categories);
        $project->categories = $ls;

        return $project;
    }

    public function store($request)
    {
        $idUser = auth('api')->user()->id;
        $project = Project::create($request->only(['name']));
        $user_project = UserProject::create([
            'id_user' => $idUser,
            'id_project' => $project->id,
        ]);
        return $project;
    }

    public function update($request, $idProject)
    {
        $updateProject = $request->only('name');
        $project = Project::find($idProject);
        $project->update($updateProject);

        return $project;
    }

    public function destroy($id)
    {
        Project::find($id)->delete();
        Category::where('id_project', $id)->delete();
        UserProject::where('id_project', $id)->delete();
        $tasks = Task::where('id_project', $id)->delete();
        Comment::where('id_project', $id)->delete();
        foreach ($tasks as $task){
            $id_task = $task->id;
            $task->delete();
            Todo_list::where('id_task', $id_task)->delete();
            UserProjectTask::where('id_task', $id_task)->delete();
        }
        return $id;
    }
}
