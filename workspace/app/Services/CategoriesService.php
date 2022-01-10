<?php

namespace App\Services;

use App\Models\Category;


class CategoriesService
{
    public function update($request, $idCategory)
    {
        $data = $request->only('name');
        $category = Category::find($idCategory);
        $category->update($data);
        return $data;
    }
    public function store($request)
    {
        $category = Category::create($request->only(['name', 'id_project']));
       return Category::with('tasks')->find($category->id);
    }
    public function show($idCategory)
    {
        return Category::find($idCategory);
    }
    public function destroy($idCategory)
    {
        $category = Category::find($idCategory);
        $category->delete();
        return $idCategory;
    }

}
