<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProjectTask extends Model
{
    use HasFactory;

    protected $table = 'users_projects_tasks';
    protected $fillable = [
        'id_user',
        'id_project',
        'id_task',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class, ['id_user', 'id_project', 'id_task'], 'id');
    }
}
