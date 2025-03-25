<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Chambre extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'chambres';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'nombre';

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
        'nombre',
        'capacite',
        'surface',
        'etage',
        'description',
        'equipements',
        'unite_code',
    ];

    /**
     * Get the unite that owns the chambre.
     */
    public function unite(): BelongsTo
    {
        return $this->belongsTo(Unite::class, 'unite_code', 'code');
    }

    /**
     * Get the admissions for the chambre.
     */
    public function admissions(): BelongsToMany
    {
        return $this->belongsToMany(Admission::class, 'admission_chambre', 'chambre_nombre', 'admission_id')
            ->withTimestamps();
    }
}
