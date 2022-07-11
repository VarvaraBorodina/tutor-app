<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Image extends Model{

    protected $table = 'imageable';
    protected $guarded=[];

    public function imageable(){
        return $this->morphTo();
    }
}
