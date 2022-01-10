<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserProject;

class MembersService
{
    public function storeMemberProject($request)
    {
        $data = $request->only(['email', 'idProject']);
        $user = User::where('email', $data['email'])->first();
        if($user){
            $idUser = $user->id;
            $idProject =data['idProject'];

        }

    }

    public function deleteMemberProject($id)
    {
    }

    public function storeMemberTask($request)
    {
    }

    public function deleteMemberTask($id)
    {
    }
}
