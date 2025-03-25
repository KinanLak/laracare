<?php

namespace Database\Factories;

use App\Models\Unite;
use Illuminate\Database\Eloquent\Factories\Factory;

class UniteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Unite::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $specialites = [
            'Cardiologie',
            'Neurologie',
            'Pédiatrie',
            'Oncologie',
            'Urgences',
            'Soins intensifs',
            'Chirurgie',
            'Maternité'
        ];

        return [
            'code' => 'U' . $this->faker->unique()->numerify('####'),
            'nom' => 'Unité ' . $this->faker->word(),
            'responsable' => $this->faker->name(),
            'specialite' => $this->faker->randomElement($specialites),
            'capacite' => $this->faker->numberBetween(10, 40),
            'batiment' => $this->faker->randomElement(['A', 'B', 'C', 'D']) . $this->faker->numberBetween(1, 5),
            'localization' => $this->faker->randomElement(['Aile Est', 'Aile Ouest', 'Aile Nord', 'Aile Sud']),
            'equipements' => $this->faker->optional(0.7)->paragraph(),
            'hopital_id' => \App\Models\Hopital::factory(),
        ];
    }
}
