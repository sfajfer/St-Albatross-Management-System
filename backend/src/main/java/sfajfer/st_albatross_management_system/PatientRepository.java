package sfajfer.st_albatross_management_system;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {

    List<Patient> findByName(String name);
}