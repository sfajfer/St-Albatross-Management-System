package sfajfer.st_albatross_management_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/hospital")
@CrossOrigin(origins = "http://localhost:5173") 
public class HospitalController {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private ScheduleRepository scheduleRepo;

    @Autowired
    private InventoryRepository inventoryRepo;

    @GetMapping("/random-patient")
    public Patient getRandomPatient() {
        List<Patient> all = patientRepo.findAll();
        if (all.isEmpty()) return null;
        return all.get(new Random().nextInt(all.size()));
    }

    @GetMapping("/random-inventory")
    public Inventory getRandomInventory() {
        List<Inventory> all = inventoryRepo.findAll();
        if (all.isEmpty()) return null;
        return all.get(new Random().nextInt(all.size()));
    }
}