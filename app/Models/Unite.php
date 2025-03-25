<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Unite extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'unites';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'code';

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
        'code',
        'nom',
        'responsable',
        'specialite',
        'capacite',
        'batiment',
        'localization',
        'equipements',
    ];

    /**
     * Get the chambres for the unite.
     */
    public function chambres(): HasMany
    {
        return $this->hasMany(Chambre::class, 'unite_code', 'code');
    }

    /**
     * Get the admissions for the unite.
     */
    public function admissions(): BelongsToMany
    {
        return $this->belongsToMany(Admission::class, 'admission_unite', 'unite_code', 'admission_id')
            ->withTimestamps();
    }
}
