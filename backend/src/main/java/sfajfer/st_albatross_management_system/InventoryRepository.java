package sfajfer.st_albatross_management_system;

import org.springframework.stereotype.Repository; 
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface InventoryRepository extends MongoRepository<Inventory, String> { }