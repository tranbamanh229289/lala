<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table='categories';
    protected $fillable=[
        'name',
        'id_project'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'id_category', 'id');
    }
}
