<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProject extends Model
{
    use HasFactory;

    protected $table='users_projects';
    protected $fillable=[
        'id_user',
        'id_project'
    ];
    public function userProjectTasks()
    {
        return $this->hasMany(UserProject::class, ['id_user', 'id_project'],  ['id_user', 'id_project']);
    }
}
