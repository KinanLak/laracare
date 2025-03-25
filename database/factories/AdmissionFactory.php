<?php

namespace Database\Factories;

use App\Models\Admission;
use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdmissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Admission::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['Urgence', 'Programmé', 'Transfert', 'Consultation'];
        $statuses = ['En attente', 'Admis', 'En traitement', 'Sortie', 'Annulé'];
        $insurances = ['Sécurité Sociale', 'Mutuelle', 'Privé', 'Sans assurance'];

        return [
            'id' => 'ADM' . $this->faker->unique()->numerify('#######'),
            'date' => $this->faker->dateTimeBetween('-3 months', '+1 month')->format('Y-m-d'),
            'heure' => $this->faker->time(),
            'type' => $this->faker->randomElement($types),
            'justification' => $this->faker->optional(0.8)->paragraph(),
            'status' => $this->faker->randomElement($statuses),
            'insurance' => $this->faker->optional(0.9)->randomElement($insurances),
            'commentaires' => $this->faker->optional(0.6)->paragraph(),
            'patientid' => function () {
                return Patient::factory()->create()->patientid;
            },
            'medecinId' => function () {
                return \App\Models\Medecin::factory()->create()->hasld;
            },
        ];
    }
}
