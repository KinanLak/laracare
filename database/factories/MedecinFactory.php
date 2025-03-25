<?php

namespace Database\Factories;

use App\Models\Medecin;
use App\Models\Hopital;
use App\Models\Personne;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class MedecinFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Medecin::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $personne = Personne::factory()->create();

        return [
            'hasld' => Str::uuid(),
            'status' => $this->faker->randomElement(['actif', 'inactif']),
            'contrat' => $this->faker->randomElement(['CDI', 'CDD', 'Vacation']),
            'licence_medicale' => $this->faker->unique()->numerify('LM########'),
            'specialite' => $this->faker->randomElement(['Cardiologie', 'Neurologie', 'Pédiatrie']),
            'dni' => $personne->dni,
            'hopital_id' => function () {
                return Hopital::factory()->create()->id;
            },
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function forExistingHopital()
    {
        return $this->state(function (array $attributes) {
            return [
                'hopital_id' => Hopital::inRandomOrder()->first()?->id ?? Hopital::factory()->create()->id,
            ];
        });
    }
}
