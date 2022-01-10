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
    Route::put('/description/{id}', 'App\Http\Controllers\DescriptionController@update');
    Route::put('time/{id}', 'App\Http\Controllers\TimesController@update');
    Route::resource('/comments', 'App\Http\Controllers\CommentsController');
    Route::resource('/projects', 'App\Http\Controllers\ProjectsController');
    Route::resource('/tasks', 'App\Http\Controllers\TasksController');
    Route::resource('/categories', 'App\Http\Controllers\CategoriesController');
    Route::resource('/todos', 'App\Http\Controllers\TodoListsController');
    Route::resource('member/project', 'App\Http\Controllers\MembersProjectController');
    Route::resource('member/task','App\Http\Controllers\MembersTaskController');
});

