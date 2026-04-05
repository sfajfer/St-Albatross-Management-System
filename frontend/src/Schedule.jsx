import React, { useState, useEffect } from 'react';

const Schedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form States
    const [formData, setFormData] = useState({ date: '', time: '', patientId: '', reason: '', status: 'Pending' });
    const [editingId, setEditingId] = useState(null);

    const API_URL = "http://localhost:9090/api/schedules";

    useEffect(() => { fetchSchedules(); }, []);

    const fetchSchedules = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => { setSchedules(data); setLoading(false); });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API_URL}/${editingId}` : API_URL;

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(() => {
            setFormData({ date: '', time: '', patientId: '', reason: '', status: 'Pending' });
            setEditingId(null);
            fetchSchedules();
        });
    };

    const handleDelete = (id) => {
        if(window.confirm("Delete this appointment?")) {
            fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(() => fetchSchedules());
        }
    };

    const handleEditClick = (item) => {
        setEditingId(item.id || item._id);
        setFormData(item);
    };

    const getSchedulesForDate = (dateStr) => schedules.filter(s => s.date === dateStr);

    const daysInApril = Array.from({ length: 30 }, (_, i) => {
        const day = i + 1;
        return `2026-04-${day < 10 ? '0' + day : day}`;
    });

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>{editingId ? "Edit Appointment" : "Add New Appointment"}</h2>
            
            {/* Form Section */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
                <input placeholder="Patient ID" value={formData.patientId} onChange={e => setFormData({...formData, patientId: e.target.value})} required />
                <input placeholder="Reason" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} required />
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button type="submit" style={{ background: editingId ? '#f39c12' : '#27ae60', color: 'white' }}>
                    {editingId ? "Update" : "Schedule"}
                </button>
                {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({date:'',time:'',patientId:'',reason:'',status:'Pending'})}}>Cancel</button>}
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', backgroundColor: '#f4f4f4', padding: '10px' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} style={{ fontWeight: 'bold', textAlign: 'center' }}>{d}</div>)}
                
                {daysInApril.map(dateStr => (
                    <div key={dateStr} style={{ minHeight: '120px', border: '1px solid #ddd', backgroundColor: '#fff', padding: '5px' }}>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{dateStr.split('-')[2]}</div>
                        {getSchedulesForDate(dateStr).map(item => (
                            <div 
                                key={item.id || item._id} 
                                onClick={() => handleEditClick(item)}
                                style={{ 
                                    fontSize: '0.7rem', cursor: 'pointer', marginBottom: '4px', padding: '4px', borderRadius: '4px',
                                    backgroundColor: item.status === 'Confirmed' ? '#e1f5fe' : item.status === 'Cancelled' ? '#ffebee' : '#fff9c4',
                                    borderLeft: `4px solid ${item.status === 'Confirmed' ? '#0288d1' : '#e53935'}`
                                }}
                            >
                                <strong>{item.time}</strong> {item.reason}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id || item._id); }} 
                                    style={{ float: 'right', border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}
                                >×</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;