<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('id_category');
            $table->unsignedInteger('id_project');
            $table->string('name');
            $table->string('description')->nullable();
            $table->dateTime('start_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->string('attrach')->nullable();
            $table->timestamps();
        });
        Schema::create('todo_lists', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->unsignedInteger('id_task');
            $table->boolean('complete');
            $table->timestamps();
        });
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('id_user_project_task');
            $table->unsignedInteger('id_user');
            $table->unsignedInteger('id_task');
            $table->unsignedInteger('id_project');
            $table->string('content');
            $table->timestamps();
        });
        Schema::create('users_projects_tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('id_user');
            $table->unsignedInteger('id_task');
            $table->unsignedInteger('id_project');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('todo_lists');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('users_tasks');
        Schema::dropIfExists('users_projects_tasks');
    }
}
