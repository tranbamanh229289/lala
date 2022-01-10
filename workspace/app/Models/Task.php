<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table='tasks';
    protected $fillable=[
        'id_category',
        'id_project',
        'name',
        'description',
        'start_time',
        'end_time',
    ];
    public function todoLists()
    {
        return $this->hasMany(Todo_list::class, 'id_task', 'id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, UserProjectTask::class, 'id_task', 'id_user');
    }

    public function comments()
    {
        return $this->hasManyThrough(Comment::class, UserProjectTask::class,'id_task',
            'id_user_project_task');
    }
    public function users_projects_tasks()
    {
        return $this->hasMany(UserProjectTask::class, 'id_task', 'id');
    }
}
