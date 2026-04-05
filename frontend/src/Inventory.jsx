import React, { useState, useEffect } from 'react';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ item: '', quantity: 0, price: 0 });

    const API_URL = "http://localhost:9090/api/inventory";

    useEffect(() => { fetchInventory(); }, []);

    const fetchInventory = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            });
    };

    const handleAdd = (e) => {
        e.preventDefault();

        // Prevent adding items with negative starting stock
        if (newItem.quantity < 0) return alert("Stock cannot be negative.");
        
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        }).then(() => {
            setNewItem({ item: '', quantity: 0, price: 0 });
            fetchInventory();
        });
    };

    const updateQuantity = (item, change) => {
        const newQuantity = item.quantity + change;
        
        // inventory should not be able to go into the negatives
        if (newQuantity < 0) {
            alert("Insufficient stock! Quantity cannot go below zero.");
            return;
        }

        const updatedItem = { ...item, quantity: newQuantity };
        
        fetch(`${API_URL}/${item.id || item._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        }).then(() => fetchInventory());
    };

    if (loading) return <p>Loading St. Albatross Supplies...</p>;

    return (
        <div style={{ padding: '30px' }}>
            <h2>Supply Inventory</h2>

            {/* Add New Product Form */}
            <form onSubmit={handleAdd} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
                <input placeholder="Item Name" value={newItem.item} onChange={e => setNewItem({...newItem, item: e.target.value})} required />
                <input type="number" placeholder="Initial Qty" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: parseInt(e.target.value)})} required />
                <input type="number" step="0.01" placeholder="Price" value={newItem.price} onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})} required />
                <button type="submit" style={{ background: '#2980b9', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px' }}>Register New Item</button>
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
                        <th>Item Name</th>
                        <th>Stock Level</th>
                        <th>Unit Price</th>
                        <th>Adjust Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id || item._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px 0' }}>{item.item}</td>
                            <td style={{ color: item.quantity < 10 ? 'red' : 'black', fontWeight: item.quantity < 10 ? 'bold' : 'normal' }}>
                                {item.quantity} {item.quantity < 10 && "(Low Stock)"}
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                <button onClick={() => updateQuantity(item, 1)} style={styles.addBtn}>+</button>
                                <button onClick={() => updateQuantity(item, -1)} style={styles.subBtn}>-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    addBtn: { margin: '0 5px', background: '#2ecc71', border: 'none', color: 'white', cursor: 'pointer', padding: '2px 10px', borderRadius: '3px' },
    subBtn: { margin: '0 5px', background: '#e67e22', border: 'none', color: 'white', cursor: 'pointer', padding: '2px 10px', borderRadius: '3px' }
};

export default Inventory;