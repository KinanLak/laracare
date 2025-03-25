<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Admission extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'admissions';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

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
        'id',
        'date',
        'heure',
        'type',
        'justification',
        'status',
        'insurance',
        'commentaires',
        'patientid',
    ];

    /**
     * Get the patient that owns the admission.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'patientid', 'patientid');
    }

    /**
     * Get the chambres for the admission.
     */
    public function chambres(): BelongsToMany
    {
        return $this->belongsToMany(Chambre::class, 'admission_chambre', 'admission_id', 'chambre_nombre')
            ->withTimestamps();
    }

    /**
     * Get the unites for the admission.
     */
    public function unites(): BelongsToMany
    {
        return $this->belongsToMany(Unite::class, 'admission_unite', 'admission_id', 'unite_code')
            ->withTimestamps();
    }
}
