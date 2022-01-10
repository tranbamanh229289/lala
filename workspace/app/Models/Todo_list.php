<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo_list extends Model
{
    use HasFactory;

    protected $table='todo_lists';

    protected $fillable=[
        'description',
        'complete',
        'id_task'
    ];
}
