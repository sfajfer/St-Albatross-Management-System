import React, { useState, useEffect } from 'react';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPatient, setNewPatient] = useState({ name: '', gender: '', contactPhone: '', dob: '' });

    const API_URL = "http://localhost:9090/api/patients";

    // fetch patients on component load
    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        console.log(patients);
    }, [patients]);

    const fetchPatients = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setPatients(data);
                setLoading(false);
            });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newPatient, medicalRecords: [] })
        }).then(() => {
            setNewPatient({ name: '', gender: '', contactPhone: '', dob: '' });
            fetchPatients();
        });
    };

    const handleDelete = (id) => {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(() => fetchPatients());
    };

    if (loading) return <p>Loading Patient Directory...</p>;

    return (
        <div style={{ padding: '30px' }}>
            <h2>Patient Directory</h2>

            {/* Add Patient Form */}
            <form onSubmit={handleAdd} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
                <input placeholder="Name" value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} required />
                <input placeholder="Phone" value={newPatient.contactPhone} onChange={e => setNewPatient({...newPatient, contactPhone: e.target.value})} />
                <select value={newPatient.gender} onChange={e => setNewPatient({...newPatient, gender: e.target.value})}>
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button type="submit" style={{ background: '#27ae60', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px' }}>Add Patient</button>
            </form>

            {/* Patients Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #ccc' }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(p => (
                        <tr key={p.key} style={{ borderBottom: '1px solid #eee' }}>
                            <td>{p.key}</td>
                            <td>{p.name}</td>
                            <td>{p.gender}</td>
                            <td>{p.contactPhone}</td>
                            <td>
                                <button onClick={() => handleDelete(p.key)} style={{ backgroundColor: 'red', color: 'white', borderRadius: '3px', cursor: 'pointer' }}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Patients;