<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DescriptionController extends Controller
{
    public function update (Request $request, $id)
    {
        $taskUpdate = Task::find($id);
        $description = $request->only(["description"]);
        $taskUpdate->description = $description["description"];
        $taskUpdate->save();
        return $taskUpdate;
    }
}
