<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TimesController extends Controller
{
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        $time = $request->only(['start_time', 'end_time']);
        $task->start_time = $time['start_time'];
        $task->end_time = $time['end_time'];
        $task->save();
        return $task;
    }
}
