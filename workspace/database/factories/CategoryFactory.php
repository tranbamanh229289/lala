<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model=Category::class;

    public function definition()
    {
        $count_projects = Project::count();
        return [
            'name' => $this->faker->name(),
            'id_project' => $this->faker->numberBetween(1, $count_projects),
        ];
    }
}
