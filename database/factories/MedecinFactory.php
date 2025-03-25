<?php

namespace Database\Factories;

use App\Models\Medecin;
use App\Models\Hopital;
use Illuminate\Database\Eloquent\Factories\Factory;

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
        return [
            'hasld' => 'MED' . $this->faker->unique()->numerify('######'),
            'status' => $this->faker->randomElement(['Actif', 'Inactif', 'En congé']),
            'contrat' => $this->faker->randomElement(['CDI', 'CDD', 'Contractuel', 'Consultant']),
            'licence_medicale' => $this->faker->unique()->bothify('LM-#####??'),
            'specialite' => $this->faker->randomElement([
                'Cardiologie',
                'Dermatologie',
                'Gastro-entérologie',
                'Neurologie',
                'Pédiatrie',
                'Psychiatrie',
                'Radiologie'
            ]),
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
