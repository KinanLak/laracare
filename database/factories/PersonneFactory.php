<?php

namespace Database\Factories;

use App\Models\Personne;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class PersonneFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Personne::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate birthdate between 80 and 18 years ago
        $birthdate = Carbon::now()->subYears(rand(18, 80))->format('Y-m-d');

        // Calculate age based on birthdate
        $age = Carbon::parse($birthdate)->age;

        return [
            'dni' => 'DNI' . $this->faker->unique()->numerify('######'),
            'prenom' => $this->faker->firstName(),
            'nom' => $this->faker->lastName(),
            'age' => $age,
            'date_naissance' => $birthdate,
        ];
    }
}
