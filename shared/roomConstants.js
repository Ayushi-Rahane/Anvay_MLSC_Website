// Shared room constants for BlockCity
// Used by both frontend and backend

const ROOMS = {
  ROOM_1: {
    id: 'room_1',
    name: 'Room 1',
    description: 'Challenge Room 1',
    maxScore: 100,
    status: 'locked', // locked | open | completed
  },
  ROOM_2: {
    id: 'room_2',
    name: 'Room 2',
    description: 'Challenge Room 2',
    maxScore: 100,
    status: 'locked',
  },
  ROOM_3: {
    id: 'room_3',
    name: 'Room 3',
    description: 'Challenge Room 3',
    maxScore: 100,
    status: 'locked',
  },
  ROOM_4: {
    id: 'room_4',
    name: 'Room 4',
    description: 'Challenge Room 4',
    maxScore: 100,
    status: 'locked',
  },
  ROOM_5: {
    id: 'room_5',
    name: 'Room 5',
    description: 'Challenge Room 5',
    maxScore: 100,
    status: 'locked',
  },
};

const TIERS = {
  BRONZE: { name: 'Bronze', minPoints: 0, maxPoints: 99 },
  SILVER: { name: 'Silver', minPoints: 100, maxPoints: 249 },
  GOLD: { name: 'Gold', minPoints: 250, maxPoints: 399 },
  PLATINUM: { name: 'Platinum', minPoints: 400, maxPoints: 500 },
};

module.exports = { ROOMS, TIERS };
