import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BlockCityMap } from '../components/BlockCityMap';
import { QRScanModal } from '../components/QRScanModal';
import { rooms, mockParticipants } from '../data/mockData';

interface BlockCityRoom {
  id: string;
  name: string;
  description: string;
  points: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
  status: 'not-started' | 'in-progress' | 'completed';
  position: { x: number; y: number };
  buildingType: 'courthouse' | 'vault' | 'tower' | 'arena' | 'cyber';
}

const difficultyMap: Record<string, 'Beginner' | 'Intermediate' | 'Advanced'> = {
  room1: 'Beginner',
  room2: 'Intermediate',
  room3: 'Intermediate',
  room4: 'Advanced',
  room5: 'Advanced'
};

const topicMap: Record<string, string> = {
  room1: 'Smart Contracts & Blockchain Law',
  room2: 'DeFi & Tokenomics Fundamentals',
  room3: 'Decentralized Identity Solutions',
  room4: 'DAO Governance & Voting Systems',
  room5: 'Web3 Application Development'
};

const buildingTypeMap: Record<string, 'courthouse' | 'vault' | 'tower' | 'arena' | 'cyber'> = {
  room1: 'courthouse',
  room2: 'vault',
  room3: 'tower',
  room4: 'arena',
  room5: 'cyber'
};

// Strategic positioning for a visually balanced city layout
const positionMap: Record<string, { x: number; y: number }> = {
  room1: { x: 20, y: 55 },  // Law Foundry - left side
  room2: { x: 35, y: 35 },  // Treasury Mint - top left
  room3: { x: 50, y: 25 },  // Identity Bureau - top center (tallest)
  room4: { x: 65, y: 40 },  // Council Chamber - top right
  room5: { x: 80, y: 60 }   // Control Center - right side
};

export const BlockCityPage: React.FC = () => {
  const navigate = useNavigate();
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const participant = mockParticipants.find(p => p.citizenId === currentUser.citizenId) || mockParticipants[0];

  // Transform rooms data to include all required properties for BlockCityMap
  const blockCityRooms: BlockCityRoom[] = rooms.map(room => {
    const progress = participant.roomProgress[room.id];
    return {
      id: room.id,
      name: room.name,
      description: room.description,
      points: room.points,
      difficulty: difficultyMap[room.id],
      topic: topicMap[room.id],
      status: progress?.status || 'not-started',
      position: positionMap[room.id],
      buildingType: buildingTypeMap[room.id]
    };
  });

  const handleEnterRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
      setQrModalOpen(true);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <BlockCityMap 
        rooms={blockCityRooms} 
        onEnterRoom={handleEnterRoom}
        onBack={handleBack}
      />
      
      <QRScanModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        room={selectedRoom}
      />
    </>
  );
};