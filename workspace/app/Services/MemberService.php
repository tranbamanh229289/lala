<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserProject;

class MemberService
{
    public function storeMemberProject($request)
    {
        $data = $request->only(['email', 'idProject']);
        $user = User::where('email', $data['email'])->first();

        $user_project = UserProject::create([
            'id_project' => $data['idProject'],
            'id_user' => $user->id,
        ]);
        return $user_project;
    }

    public function deleteMemberProject($id)
    {
        $project = UserProject::where('id_user', $id)->first();

    }

    public function storeMemberTask($request)
    {
    }

    public function deleteMemberTask($id)
    {
    }
}
