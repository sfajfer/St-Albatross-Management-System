package sfajfer.st_albatross_management_system;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inventory")
public class Inventory {
    @Id
    private String id;
    private String item;
    private int quantity;
    private double price;

    public Inventory(String id, String item, int quantity, double price) {
        this.id = id;
        this.item = item;
        this.quantity = quantity;
        this.price = price;
    }

    public Inventory() {}

    public String getId() { return id; }
    public String getItem() { return item; }
    public int getQuantity() { return quantity; }
    public double getPrice() { return price; }

    public void setId(String id) {
        this.id = id;
    }
}