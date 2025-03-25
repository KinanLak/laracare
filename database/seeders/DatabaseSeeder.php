<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Hopital;
use App\Models\Medecin;
use App\Models\Unite;
use App\Models\Chambre;
use App\Models\Personne;
use App\Models\Patient;
use App\Models\Admission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->createOneQuietly([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password')
        ]);

        // Create 5 hospitals
        $hopitals = Hopital::factory(5)->create();

        // Create personnes for doctors first
        $medecinPersonnes = Personne::factory(20)->create();
        
        // Create 20 doctors (4 per hospital), using existing personnes
        $medecins = [];
        $personneIndex = 0;
        foreach ($hopitals as $hopital) {
            for ($i = 0; $i < 4; $i++) {
                $medecins[] = Medecin::factory()->create([
                    'hopital_id' => $hopital->id,
                    'dni' => $medecinPersonnes[$personneIndex++]->dni
                ]);
            }
        }

        // Create 10 unités (units), assigned to random hospitals
        $unites = [];
        foreach ($hopitals as $hopital) {
            $unites = array_merge($unites, Unite::factory(2)->create([
                'hopital_id' => $hopital->id
            ])->all());
        }

        // For each unit, create 3-8 chambres (rooms)
        foreach ($unites as $unite) {
            Chambre::factory(rand(3, 8))->create([
                'unite_code' => $unite->code
            ]);
        }

        // Create 50 patients (creates personnes implicitly)
        $patients = [];
        for ($i = 0; $i < 50; $i++) {
            $personne = Personne::factory()->create();
            $patients[] = Patient::factory()->create([
                'dni' => $personne->dni
            ]);
        }

        // Create 100 random admissions with random doctors
        $admissions = [];
        for ($i = 0; $i < 100; $i++) {
            $admissions[] = Admission::factory()->create([
                'patientid' => $patients[array_rand($patients)]->patientid,
                'medecinId' => $medecins[array_rand($medecins)]->hasld
            ]);
        }

        // Assign random rooms and units to admissions
        $chambres = Chambre::all();
        $unites = Unite::all();

        foreach ($admissions as $admission) {
            // Assign 1-2 random rooms to each admission
            $randomChambres = $chambres->random(rand(1, 2));
            $admission->chambres()->attach($randomChambres);

            // Assign 1 random unit to each admission
            $randomUnite = $unites->random(1);
            $admission->unites()->attach($randomUnite);
        }
    }
}
