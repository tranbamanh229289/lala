<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table='projects';
    protected $fillable=[
        'name'
    ];

    public function categories()
    {
        return $this->hasMany(Category::class, 'id_project', 'id');
    }

    public function tasks()
    {
        return $this->hasManyThrough(Task::class,Category::class,'id_project','id_category');
    }
    public function users()
    {
        return $this->belongsToMany(User::Class, UserProject::class, 'id_project', 'id_user');
    }
    public function taskss()
    {
        return $this->hasMany(Task::class, 'id_project', 'id');
}
}
