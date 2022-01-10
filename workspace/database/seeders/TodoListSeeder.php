<?php

namespace Database\Seeders;

use App\Models\Todo_list;
use Illuminate\Database\Seeder;

class TodoListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Todo_list::factory()->count(200)->create();
    }
}
