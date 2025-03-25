<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'patients';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'patientid';

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
        'patientid',
        'dni',
    ];

    /**
     * Get the personne that owns the patient.
     */
    public function personne(): BelongsTo
    {
        return $this->belongsTo(Personne::class, 'dni', 'dni');
    }

    /**
     * Get the admissions for the patient.
     */
    public function admissions(): HasMany
    {
        return $this->hasMany(Admission::class, 'patientid', 'patientid');
    }
}
