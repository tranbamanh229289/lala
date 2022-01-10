<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use App\Models\UserProject;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model= UserProject::class;

    public function definition()
    {
        $count_project = Project::all()->count();
        $count_user = User::all()->count();
        $ls = [];
        for ($i= 1; $i <= $count_project; $i++){
            for ($j= 1; $j <= $count_user; $j++){
                array_push($ls, $i."-".$j);
            }
        }
        $ls = $this->faker->unique->randomElement($ls);
        $ls = explode('-',  $ls);
        return [
            'id_project' => $ls[0],
            'id_user' => $ls[1],
        ];
    }
}
