export interface Room {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
}

export interface Participant {
  citizenId: string;
  name: string;
  role: string;
  totalScore: number;
  tier: 'Explorer' | 'Builder' | 'Architect';
  currentRoom: string | null;
  roomsCompleted: string[];
  roomProgress: {
    [key: string]: {
      status: 'not-started' | 'in-progress' | 'completed';
      pointsEarned: number;
      entryTime?: Date;
      completionTime?: Date;
    };
  };
  badges: string[];
}

export interface AdminStats {
  totalParticipants: number;
  activeNow: number;
  roomsOccupied: number;
  totalTransactions: number;
}

export const rooms: Room[] = [
  {
    id: 'room1',
    name: 'Law Foundry',
    description: 'Learn about smart contracts and blockchain law',
    points: 100,
    icon: 'Scale'
  },
  {
    id: 'room2',
    name: 'Treasury Mint',
    description: 'Master DeFi and tokenomics',
    points: 100,
    icon: 'Coins'
  },
  {
    id: 'room3',
    name: 'Identity Bureau',
    description: 'Explore decentralized identity solutions',
    points: 100,
    icon: 'Shield'
  },
  {
    id: 'room4',
    name: 'Council Chamber',
    description: 'Understand DAO governance',
    points: 100,
    icon: 'Users'
  },
  {
    id: 'room5',
    name: 'Control Center',
    description: 'Build Web3 applications',
    points: 100,
    icon: 'Terminal'
  }
];

export const mockParticipants: Participant[] = [
  {
    citizenId: 'BC2025001',
    name: 'Rahul Sharma',
    role: 'Miner',
    totalScore: 500,
    tier: 'Architect',
    currentRoom: null,
    roomsCompleted: ['room1', 'room2', 'room3', 'room4', 'room5'],
    roomProgress: {
      room1: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T09:00:00'), completionTime: new Date('2025-03-07T10:30:00') },
      room2: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T10:35:00'), completionTime: new Date('2025-03-07T12:00:00') },
      room3: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T12:15:00'), completionTime: new Date('2025-03-07T13:45:00') },
      room4: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T14:00:00'), completionTime: new Date('2025-03-07T15:30:00') },
      room5: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T15:45:00'), completionTime: new Date('2025-03-07T17:00:00') }
    },
    badges: ['First Entry', 'Speed Runner', 'Completionist']
  },
  {
    citizenId: 'BC2025002',
    name: 'Priya Patel',
    role: 'Auditor',
    totalScore: 475,
    tier: 'Architect',
    currentRoom: 'room5',
    roomsCompleted: ['room1', 'room2', 'room3', 'room4'],
    roomProgress: {
      room1: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T09:15:00'), completionTime: new Date('2025-03-07T10:45:00') },
      room2: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T11:00:00'), completionTime: new Date('2025-03-07T12:30:00') },
      room3: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T13:00:00'), completionTime: new Date('2025-03-07T14:30:00') },
      room4: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T14:45:00'), completionTime: new Date('2025-03-07T16:00:00') },
      room5: { status: 'in-progress', pointsEarned: 75, entryTime: new Date('2025-03-07T16:15:00') }
    },
    badges: ['Quick Learner', 'Team Player']
  },
  {
    citizenId: 'BC2025003',
    name: 'Arjun Desai',
    role: 'Builder',
    totalScore: 450,
    tier: 'Architect',
    currentRoom: null,
    roomsCompleted: ['room1', 'room2', 'room3', 'room4'],
    roomProgress: {
      room1: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T09:30:00'), completionTime: new Date('2025-03-07T11:00:00') },
      room2: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T11:15:00'), completionTime: new Date('2025-03-07T12:45:00') },
      room3: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T13:15:00'), completionTime: new Date('2025-03-07T14:45:00') },
      room4: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T15:00:00'), completionTime: new Date('2025-03-07T16:30:00') },
      room5: { status: 'in-progress', pointsEarned: 50, entryTime: new Date('2025-03-07T16:45:00') }
    },
    badges: ['Innovator', 'Early Bird']
  },
  {
    citizenId: 'BC2025004',
    name: 'Sneha Reddy',
    role: 'Validator',
    totalScore: 400,
    tier: 'Builder',
    currentRoom: 'room4',
    roomsCompleted: ['room1', 'room2', 'room3'],
    roomProgress: {
      room1: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T10:00:00'), completionTime: new Date('2025-03-07T11:30:00') },
      room2: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T12:00:00'), completionTime: new Date('2025-03-07T13:30:00') },
      room3: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T14:00:00'), completionTime: new Date('2025-03-07T15:30:00') },
      room4: { status: 'in-progress', pointsEarned: 100, entryTime: new Date('2025-03-07T16:00:00') },
      room5: { status: 'not-started', pointsEarned: 0 }
    },
    badges: ['Consistent', 'Dedicated']
  },
  {
    citizenId: 'BC2025005',
    name: 'Vikram Singh',
    role: 'Miner',
    totalScore: 375,
    tier: 'Builder',
    currentRoom: null,
    roomsCompleted: ['room1', 'room2', 'room3'],
    roomProgress: {
      room1: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T09:45:00'), completionTime: new Date('2025-03-07T11:15:00') },
      room2: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T11:45:00'), completionTime: new Date('2025-03-07T13:15:00') },
      room3: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T13:45:00'), completionTime: new Date('2025-03-07T15:15:00') },
      room4: { status: 'in-progress', pointsEarned: 75, entryTime: new Date('2025-03-07T15:30:00') },
      room5: { status: 'not-started', pointsEarned: 0 }
    },
    badges: ['Persistent']
  },
  {
    citizenId: 'BC2025006',
    name: 'Aisha Khan',
    role: 'Auditor',
    totalScore: 300,
    tier: 'Builder',
    currentRoom: 'room3',
    roomsCompleted: ['room1', 'room2'],
    roomProgress: {
      room1: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T10:30:00'), completionTime: new Date('2025-03-07T12:00:00') },
      room2: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T12:30:00'), completionTime: new Date('2025-03-07T14:00:00') },
      room3: { status: 'in-progress', pointsEarned: 100, entryTime: new Date('2025-03-07T14:30:00') },
      room4: { status: 'not-started', pointsEarned: 0 },
      room5: { status: 'not-started', pointsEarned: 0 }
    },
    badges: ['Explorer']
  },
  {
    citizenId: 'BC2025007',
    name: 'Karan Joshi',
    role: 'Builder',
    totalScore: 275,
    tier: 'Explorer',
    currentRoom: null,
    roomsCompleted: ['room1', 'room2'],
    roomProgress: {
      room1: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T11:00:00'), completionTime: new Date('2025-03-07T12:30:00') },
      room2: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T13:00:00'), completionTime: new Date('2025-03-07T14:30:00') },
      room3: { status: 'in-progress', pointsEarned: 75, entryTime: new Date('2025-03-07T15:00:00') },
      room4: { status: 'not-started', pointsEarned: 0 },
      room5: { status: 'not-started', pointsEarned: 0 }
    },
    badges: ['Newcomer']
  },
  {
    citizenId: 'BC2025008',
    name: 'Meera Nair',
    role: 'Validator',
    totalScore: 250,
    tier: 'Explorer',
    currentRoom: 'room3',
    roomsCompleted: ['room1', 'room2'],
    roomProgress: {
      room1: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T11:30:00'), completionTime: new Date('2025-03-07T13:00:00') },
      room2: { status: 'completed', pointsEarned: 100, entryTime: new Date('2025-03-07T13:30:00'), completionTime: new Date('2025-03-07T15:00:00') },
      room3: { status: 'in-progress', pointsEarned: 50, entryTime: new Date('2025-03-07T15:30:00') },
      room4: { status: 'not-started', pointsEarned: 0 },
      room5: { status: 'not-started', pointsEarned: 0 }
    },
    badges: ['Curious']
  }
];

export const adminStats: AdminStats = {
  totalParticipants: 125,
  activeNow: 47,
  roomsOccupied: 5,
  totalTransactions: 380
};

export const getTierColor = (tier: string): string => {
  switch (tier) {
    case 'Architect':
      return 'text-[#FBBF24]';
    case 'Builder':
      return 'text-[#7C3AED]';
    case 'Explorer':
      return 'text-[#22D3EE]';
    default:
      return 'text-white';
  }
};

export const getTierBadgeColor = (tier: string): string => {
  switch (tier) {
    case 'Architect':
      return 'bg-[#FBBF24]/20 text-[#FBBF24] border-[#FBBF24]/40';
    case 'Builder':
      return 'bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/40';
    case 'Explorer':
      return 'bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/40';
    default:
      return 'bg-white/20 text-white border-white/40';
  }
};

export const getRoomStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/40';
    case 'in-progress':
      return 'bg-[#FBBF24]/20 text-[#FBBF24] border-[#FBBF24]/40';
    case 'not-started':
      return 'bg-white/10 text-white/60 border-white/20';
    default:
      return 'bg-white/10 text-white/60 border-white/20';
  }
};
