import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [members, setMembers] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [committee, setCommittee] = useState('');
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    committee: '',
    position: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersRes = await axios.get('http://localhost:3000/api/members');
        setMembers(membersRes.data);

        const attendanceRes = await axios.get('http://localhost:3000/api/attendances');
        setAttendances(attendanceRes.data);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchData();
  }, []);

  const addMember = () => {
    axios.post('http://localhost:3000/api/members', newMember)
      .then(res => {
        setMembers([...members, res.data]);
        setNewMember({ name: '', email: '', committee: '', position: '' });
      })
      .catch(err => console.error('Error:', err));
  };

  const filteredMembers = committee
    ? members.filter(m => m.committee === committee) : members;

  const getMemberAttendances = (memberId) => attendances.filter(a => a.memberId === memberId);

  return (
    <div className="app-container">
      <h1>Committee Attendance</h1>

      <div className="card">
        <h2>Add New Member</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Committee"
            value={newMember.committee}
            onChange={(e) => setNewMember({ ...newMember, committee: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            value={newMember.position}
            onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
          />
        </div>
        <button className="primary-btn" onClick={addMember}>Add Member</button>
      </div>

      <div className="card filter-section">
        <label>Filter by Committee:</label>
        <select value={committee} onChange={(e) => setCommittee(e.target.value)}>
          <option value="">All Committees</option>
          {[...new Set(members.map(m => m.committee))].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="card members-list">
        <h2>Members ({filteredMembers.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Committee</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
          {filteredMembers.map(member => {
              const memberAttendances = getMemberAttendances(member.id);
              return (
                <>
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.committee}</td>
                    <td>{member.position}</td>
                  </tr>
                  {memberAttendances.length > 0 && (
                    <tr className="attendance-row">
                      <td colSpan="4">
                        <div className="attendance-records">
                          <h4>Attendance Records</h4>
                          <table>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Attendance</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {memberAttendances.map(att => (
                                <tr key={att.id}>
                                  <td>{att.date}</td>
                                  <td>{att.status}</td>
                                  <td>{att.notes || 'N/A'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;