<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\Personne;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patientid' => 'P' . $this->faker->unique()->numerify('######'),
            'dni' => function () {
                return Personne::factory()->create()->dni;
            },
        ];
    }
}
