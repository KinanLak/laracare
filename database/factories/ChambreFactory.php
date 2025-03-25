<?php

namespace Database\Factories;

use App\Models\Chambre;
use App\Models\Unite;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChambreFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Chambre::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $etage = $this->faker->numberBetween(0, 5);

        // Keep trying until we find a unique room number
        do {
            $numero = $this->faker->numberBetween(1, 999);
            $nombre = 'C' . $etage . str_pad($numero, 2, '0', STR_PAD_LEFT);
        } while (Chambre::where('nombre', $nombre)->exists());

        return [
            'nombre' => $nombre,
            'capacite' => $this->faker->randomElement([1, 2, 4]),
            'surface' => $this->faker->randomFloat(1, 15, 50),
            'etage' => $etage,
            'description' => $this->faker->optional(0.7)->sentence(),
            'equipements' => $this->faker->optional(0.7)->paragraph(),
            'unite_code' => function () {
                return Unite::factory()->create()->code;
            },
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function forExistingUnite()
    {
        return $this->state(function (array $attributes) {
            return [
                'unite_code' => Unite::inRandomOrder()->first()?->code ?? Unite::factory()->create()->code,
            ];
        });
    }
}
