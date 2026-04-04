package sfajfer.st_albatross_management_system;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.List;

@SpringBootApplication
public class StAlbatrossManagementSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(StAlbatrossManagementSystemApplication.class, args);
    }

    // This block populates your MongoDB on startup
    @Bean
    CommandLineRunner runner(PatientRepository pRepo, InventoryRepository iRepo, ScheduleRepository sRepo) {
        return args -> {
            // 1. Clear existing data to avoid duplicates
            pRepo.deleteAll();
            iRepo.deleteAll();
            sRepo.deleteAll();

            // 2. Populate Patients (8 Rows)
            pRepo.saveAll(List.of(
                new Patient("P001", "John Doe", "1985-04-12", "Male", "555-0101", 
                    List.of(new Patient.MedicalRecord("2026-01-10", "Fever", "Flu", "Antibiotics", "Rest"))),
                new Patient("P002", "Jane Smith", "1992-11-23", "Female", "555-0102", List.of()),
                // ... Add 6 more here
                new Patient("P008", "Albatross Sr.", "1960-01-01", "Non-binary", "555-0108", List.of())
            ));

            // 3. Populate Inventory (8 Rows)
            iRepo.saveAll(List.of(
                new Inventory(null, "Aspirin", 100, 10.99),
                new Inventory(null, "Bandages", 250, 5.50),
                new Inventory(null, "Syringes", 500, 1.20),
                new Inventory(null, "Scalpel", 20, 45.00),
                new Inventory(null, "Gloves (Box)", 100, 15.00),
                new Inventory(null, "Thermometer", 30, 12.50),
                new Inventory(null, "Antiseptic", 40, 8.75),
                new Inventory(null, "Gauze", 200, 3.25)
            ));

            // 4. Populate Schedule (8 Rows)
            sRepo.saveAll(List.of(
                new Schedule(null, "2026-04-10", "09:00", "P001", "Checkup", "Confirmed"),
                new Schedule(null, "2026-04-10", "10:30", "P002", "Surgery", "Pending"),
                // ... Add 6 more here
                new Schedule(null, "2026-04-12", "14:00", "P008", "Consultation", "Cancelled")
            ));

            System.out.println("✅ Hospital Database Successfully Populated with 24 records!");
        };
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:5173");
            }
        };
    }
}