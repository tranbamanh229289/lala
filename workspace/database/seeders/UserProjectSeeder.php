<?php

namespace Database\Seeders;

use App\Models\UserProject;
use Illuminate\Database\Seeder;

class UserProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserProject::factory()->count(80)->create();
    }
}
