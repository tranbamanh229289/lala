<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => 'api'], function(){
    Route::post('/login', 'App\Http\Controllers\UserController@login');
    Route::post('/logout', 'App\Http\Controllers\UserController@logout');
    Route::post('/me','App\Http\Controllers\UserController@me');
    Route::post('/inviteUser', 'App\Http\Controllers\UserController@inviteUserToProject');
    Route::put('/descriptions/{id}', 'App\Http\Controllers\DescriptionController@update');
    Route::put('times/{id}', 'App\Http\Controllers\TimeController@update');
    Route::resource('/comments', 'App\Http\Controllers\CommentController');
    Route::resource('/projects', 'App\Http\Controllers\ProjectController');
    Route::resource('/tasks', 'App\Http\Controllers\TaskController');
    Route::resource('/categories', 'App\Http\Controllers\CategoryController');
    Route::resource('/todos', 'App\Http\Controllers\TodoListController');
    Route::resource('/project/members', 'App\Http\Controllers\MemberProjectController');
    Route::resource('task/members', 'App\Http\Controllers\MemberTaskController');
});

