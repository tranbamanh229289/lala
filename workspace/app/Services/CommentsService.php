<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\UserProjectTask;
use App\Models\UserProject;

class CommentsService
{
    public function store ($request)
    {
        $newComment= $request->only(['id_user', 'id_project', 'id_task', 'content']);
        $user_project_task= UserProjectTask::where('id_user', '=', $newComment['id_user'])
            ->where('id_project', '=', $newComment['id_project'])
            ->where('id_task', $newComment['id_task'])->first();

        return Comment::create([
            'id_user' => $newComment['id_user'],
            'id_project' => $newComment['id_project'],
            'id_task' => $newComment['id_task'],
            'content'=>$newComment['content'],
            'id_user_project_task' => $user_project_task['id'],
        ]);
    }

    public function destroy($idComment)
    {
        $comment = Comment::find($idComment);
        $comment->delete();

        return $idComment;
    }

    public function update($request, $idComment)
    {
        $updateComment = $request->only(['content']);
        $comment = Comment::find($idComment);
        $comment->update($updateComment);

        return $comment;
    }
}
