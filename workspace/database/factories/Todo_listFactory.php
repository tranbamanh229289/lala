<?php

namespace Database\Factories;

use App\Models\Todo_list;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class Todo_listFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model= Todo_list::class;

    public function definition()
    {
        $count_tasks = Task::count();
        return [
            'complete' => $this->faker->boolean(),
            'description' => $this->faker->text(),
            'id_task' => $this->faker->numberBetween(1, $count_tasks),
        ];
    }
}
