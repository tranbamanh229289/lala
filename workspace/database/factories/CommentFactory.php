<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\UserProjectTask;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model=Comment::class;

    public function definition()
    {
        $ls = UserProjectTask::select('id', 'id_task', 'id_project', 'id_user')->get();
        $user_project_task = $this->faker->randomElement($ls);

        return [
            'id_user_project_task' => $user_project_task->id,
            'id_user' => $user_project_task->id_user,
            'id_project' => $user_project_task->id_project,
            'id_task' => $user_project_task->id_task,
            'content' => $this->faker->text(),
        ];
    }
}
