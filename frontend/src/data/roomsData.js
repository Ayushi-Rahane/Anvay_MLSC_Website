import { Scale, Landmark, Fingerprint, Building2, Shield } from 'lucide-react';

export const ROOMS_META = [
    {
        id: 'room_1',
        number: 1,
        name: 'Law Foundry',
        color: '#ff5500',
        Icon: Scale,
        description: 'Legal challenges and constitutional puzzles',
    },
    {
        id: 'room_2',
        number: 2,
        name: 'Treasury Mint',
        color: '#83f40b',
        Icon: Landmark,
        description: 'Financial strategy and resource management',
    },
    {
        id: 'room_3',
        number: 3,
        name: 'Identity Bureau',
        color: '#06b6d4',
        Icon: Fingerprint,
        description: 'Citizen verification and identity challenges',
    },
    {
        id: 'room_4',
        number: 4,
        name: 'Council Chamber',
        color: '#fbd83c',
        Icon: Building2,
        description: 'Governance decisions and policy debates',
    },
    {
        id: 'room_5',
        number: 5,
        name: 'Control Center',
        color: '#34d399',
        Icon: Shield,
        description: 'Cybersecurity and system defense missions',
    },
];
