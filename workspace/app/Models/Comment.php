<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table='comments';
    protected $fillable=[
        'id_user_project_task',
        'id_user',
        'id_project',
        'id_task',
        'content'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
