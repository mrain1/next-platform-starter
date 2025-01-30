import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const VillaTracker = () => {
  const villas = [
    {
      name: "Villa Carina",
      location: "Island of Ischia, Campania",
      dates: "June 29 – July 11, 2025",
      startDate: "2025-06-29",
      endDate: "2025-07-11",
      maxGuests: 12,
      url: "https://emmavillas.com/en/Campania/villa-carina-12",
      details: "Private pool, sea views, Wi-Fi, A/C, private chef optional"
    },
    {
      name: "Casolare San Martino",
      location: "Val di Cecina, Tuscany",
      dates: "July 11 – July 25, 2025",
      startDate: "2025-07-11",
      endDate: "2025-07-25",
      maxGuests: 16,
      url: "https://emmavillas.com/en/Tuscany/casolare-san-martino-16-1",
      details: "Scenic location, private pool, daily cleaning, Wi-Fi, A/C, chef optional"
    }
  ];

  const [familyMembers, setFamilyMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    villa: '',
    adults: 1,
    children: 0,
    startDate: '',
    endDate: '',
    notes: ''
  });

  const calculateTotalGuests = (villa) => {
    return familyMembers
      .filter(member => member.villa === villa.name)
      .reduce((total, member) => total + member.adults + member.children, 0);
  };

  const wouldExceedCapacity = (villa, adults, children) => {
    const currentGuests = calculateTotalGuests(villa);
    return (currentGuests + adults + children) > villa.maxGuests;
  };

  const addFamilyMember = () => {
    if (newMember.name && newMember.villa && newMember.startDate && newMember.endDate) {
      setFamilyMembers([...familyMembers, { ...newMember, id: Date.now() }]);
      setNewMember({
        name: '',
        villa: '',
        adults: 1,
        children: 0,
        startDate: '',
        endDate: '',
        notes: ''
      });
    }
  };

  const removeFamilyMember = (id) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-green-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-serif">Italian Villa Family Stay Tracker - Estate 2025</CardTitle>
      </CardHeader>
      <CardContent className="bg-stone-50">
        {/* Add New Family Member Form */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border-l-4 border-red-600">
          <h3 className="text-lg font-semibold mb-4 font-serif text-green-800">Add Family Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Family Member Name"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Select Villa</label>
              <select
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newMember.villa}
                onChange={(e) => setNewMember({ ...newMember, villa: e.target.value })}
              >
                <option value="">Choose Villa</option>
                {villas.map(villa => {
                  const isFull = wouldExceedCapacity(villa, newMember.adults, newMember.children);
                  return (
                    <option 
                      key={villa.name} 
                      value={villa.name}
                      disabled={isFull}
                    >
                      {villa.name} {isFull ? '(Full)' : `(${villa.maxGuests - calculateTotalGuests(villa)} spots remaining)`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Number of Adults (18+)</label>
              <input
                type="number"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                min="1"
                value={newMember.adults}
                onChange={(e) => setNewMember({ ...newMember, adults: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Number of Children (0-17)</label>
              <input
                type="number"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                min="0"
                value={newMember.children}
                onChange={(e) => setNewMember({ ...newMember, children: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Arrival Date</label>
              <input
                type="date"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newMember.startDate}
                min={newMember.villa ? villas.find(v => v.name === newMember.villa)?.startDate : ''}
                max={newMember.villa ? villas.find(v => v.name === newMember.villa)?.endDate : ''}
                onChange={(e) => setNewMember({ ...newMember, startDate: e.target.value })}
                disabled={!newMember.villa}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Departure Date</label>
              <input
                type="date"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newMember.endDate}
                min={newMember.startDate || (newMember.villa ? villas.find(v => v.name === newMember.villa)?.startDate : '')}
                max={newMember.villa ? villas.find(v => v.name === newMember.villa)?.endDate : ''}
                onChange={(e) => setNewMember({ ...newMember, endDate: e.target.value })}
                disabled={!newMember.villa || !newMember.startDate}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                placeholder="Dietary requirements, special requests, etc."
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newMember.notes}
                onChange={(e) => setNewMember({ ...newMember, notes: e.target.value })}
              />
            </div>
            <button
              className="md:col-span-2 bg-green-700 hover:bg-green-800 text-white p-3 rounded transition duration-200"
              onClick={addFamilyMember}
            >
              Add Family Member
            </button>
          </div>
        </div>

        {/* Villa Sections */}
        {villas.map(villa => (
          <div key={villa.name} className="mb-8 border-t pt-4">
            <h3 className="text-xl font-serif font-semibold mb-2 text-green-800">{villa.name}</h3>
            <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Location: {villa.location}</p>
              <p className="text-sm text-gray-600">Dates Available: {villa.dates}</p>
              <p className="text-sm text-gray-600">Maximum Guests: {villa.maxGuests}</p>
              <p className="text-sm text-gray-600">Current Total Guests: {calculateTotalGuests(villa)}/{villa.maxGuests}</p>
              <p className="text-sm text-gray-600 mt-2">
                <a href={villa.url} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 underline">
                  View Villa Details →
                </a>
              </p>
            </div>

            {/* Family Members List */}
            <div className="space-y-3">
              {familyMembers
                .filter(member => member.villa === villa.name)
                .map(member => (
                  <div key={member.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border-l-2 border-green-600">
                    <div>
                      <p className="font-medium text-green-800">{member.name}</p>
                      <p className="text-sm text-gray-600">
                        {member.adults} {member.adults === 1 ? 'Adult' : 'Adults'} | {member.children} {member.children === 1 ? 'Child' : 'Children'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Stay: {new Date(member.startDate).toLocaleDateString()} to {new Date(member.endDate).toLocaleDateString()}
                      </p>
                      {member.notes && (
                        <p className="text-sm text-gray-600 mt-1">Notes: {member.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFamilyMember(member.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition duration-200"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VillaTracker;