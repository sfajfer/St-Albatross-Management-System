package sfajfer.st_albatross_management_system;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository repository;

    @GetMapping
    public List<Inventory> getAllInventory() {
        return repository.findAll();
    }

    @PostMapping
    public Inventory addItem(@RequestBody Inventory item) {
        return repository.save(item);
    }

    @PutMapping("/{id}")
    public Inventory updateItem(@PathVariable String id, @RequestBody Inventory item) {
        item.setId(id);
        return repository.save(item);
    }
}