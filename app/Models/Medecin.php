<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Medecin extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'medecins';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'hasld';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'hasld',
        'status',
        'contrat',
        'licence_medicale',
        'specialite',
        'hopital_id',
    ];

    /**
     * Get the hospital that owns the medecin.
     */
    public function hopital(): BelongsTo
    {
        return $this->belongsTo(Hopital::class, 'hopital_id', 'id');
    }
}
