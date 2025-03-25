<?php

namespace Database\Factories;

use App\Models\Hopital;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class HopitalFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Hopital::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => 'HOP' . $this->faker->unique()->numerify('######'),
            'nom' => $this->faker->company(),
            'adresse' => $this->faker->streetAddress(),
            'telephone' => $this->faker->phoneNumber(),
            'ville' => $this->faker->city(),
            'email' => $this->faker->unique()->safeEmail(),
            'directeur' => $this->faker->name(),
        ];
    }
}
