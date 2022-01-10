<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model=Task::class;

    public function definition()
    {
        $count_projects = Project::count();
        $id_project = $this->faker->numberBetween(1,$count_projects);
        $categories = Project::with('categories')->find($id_project)->categories->pluck('id');
        $category = $this->faker->randomElement($categories);

        return [
            'name' => $this->faker->name(),
            'id_project' => $id_project,
            'id_category' => $category,
            'description' => $this->faker->text,
            'attrach' => $this->faker->url,
            'start_time' => $this->faker->dateTime,
            'end_time' => $this->faker->dateTimeBetween($startDate='-30 years', $endDate='now'),
        ];
    }
}
