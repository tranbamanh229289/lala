<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model= Project::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
        ];
    }
}
