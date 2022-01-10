<?php

namespace Database\Seeders;

use App\Models\UserProject;
use App\Models\UserProjectTask;
use Illuminate\Database\Seeder;

class UserProjectTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ls = UserProject::join('tasks', "users_projects.id_project", "=", 'tasks.id_project')->get(['users_projects.*', 'tasks.*']);
        foreach ($ls as $item){
            UserProjectTask::create([
                'id_project' => $item->id_project,
                'id_user'=> $item->id_user,
                'id_task' => $item->id,
            ]);
        }
    }
}
