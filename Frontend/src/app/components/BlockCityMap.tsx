import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Lock, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import { BlockCityButton } from './BlockCityButton';
import { StatusBadge } from './StatusBadge';
import bgImage from 'figma:asset/89b6c162e04f928e8497cdd35dd1831ee7b30450.png';

interface Room {
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

interface BlockCityMapProps {
  rooms: Room[];
  onEnterRoom?: (roomId: string) => void;
  onBack?: () => void;
}

// SVG Building Components
const CourthouseBuilding: React.FC<{ glowColor: string; isActive: boolean }> = ({ glowColor, isActive }) => (
  <g className="building-courthouse">
    {/* Base */}
    <rect x="30" y="60" width="40" height="50" fill="#1e1b4b" stroke={glowColor} strokeWidth="1" />
    {/* Columns */}
    <rect x="32" y="70" width="4" height="40" fill="#312e81" />
    <rect x="44" y="70" width="4" height="40" fill="#312e81" />
    <rect x="56" y="70" width="4" height="40" fill="#312e81" />
    <rect x="64" y="70" width="4" height="40" fill="#312e81" />
    {/* Roof */}
    <polygon points="50,50 30,60 70,60" fill="#4c1d95" stroke={glowColor} strokeWidth="1" />
    {/* Scale Symbol */}
    <circle cx="50" cy="75" r="5" fill={glowColor} opacity="0.6" />
    {/* Windows */}
    <rect x="40" y="80" width="3" height="3" fill={isActive ? glowColor : '#4c1d95'} opacity={isActive ? '1' : '0.4'} />
    <rect x="54" y="80" width="3" height="3" fill={isActive ? glowColor : '#4c1d95'} opacity={isActive ? '1' : '0.4'} />
    <rect x="40" y="90" width="3" height="3" fill={isActive ? glowColor : '#4c1d95'} opacity={isActive ? '1' : '0.4'} />
    <rect x="54" y="90" width="3" height="3" fill={isActive ? glowColor : '#4c1d95'} opacity={isActive ? '1' : '0.4'} />
    {isActive && (
      <circle cx="50" cy="85" r="25" fill="none" stroke={glowColor} strokeWidth="1.5" opacity="0.3" className="animate-pulse" />
    )}
  </g>
);

const VaultBuilding: React.FC<{ glowColor: string; isActive: boolean }> = ({ glowColor, isActive }) => (
  <g className="building-vault">
    {/* Base structure */}
    <rect x="28" y="65" width="44" height="45" fill="#1e1b4b" stroke={glowColor} strokeWidth="1" />
    <rect x="32" y="69" width="36" height="37" fill="#0f172a" stroke={glowColor} strokeWidth="0.5" />
    {/* Vault door circle */}
    <circle cx="50" cy="87" r="12" fill="#312e81" stroke={glowColor} strokeWidth="1.5" />
    <circle cx="50" cy="87" r="8" fill="#1e1b4b" stroke={glowColor} strokeWidth="1" />
    <circle cx="50" cy="87" r="3" fill={glowColor} opacity="0.8" />
    {/* Spokes */}
    <line x1="50" y1="79" x2="50" y2="95" stroke={glowColor} strokeWidth="1" opacity="0.6" />
    <line x1="42" y1="87" x2="58" y2="87" stroke={glowColor} strokeWidth="1" opacity="0.6" />
    {/* Security lights */}
    <rect x="34" y="72" width="2" height="2" fill={isActive ? '#22c55e' : '#ef4444'} opacity={isActive ? '1' : '0.5'} />
    <rect x="64" y="72" width="2" height="2" fill={isActive ? '#22c55e' : '#ef4444'} opacity={isActive ? '1' : '0.5'} />
    {isActive && (
      <circle cx="50" cy="87" r="20" fill="none" stroke={glowColor} strokeWidth="1.5" opacity="0.3" className="animate-pulse" />
    )}
  </g>
);

const TowerBuilding: React.FC<{ glowColor: string; isActive: boolean }> = ({ glowColor, isActive }) => (
  <g className="building-tower">
    {/* Main tower */}
    <rect x="38" y="45" width="24" height="65" fill="#0f172a" stroke={glowColor} strokeWidth="1" opacity="0.9" />
    {/* Glass panels effect */}
    <rect x="40" y="48" width="8" height="8" fill={glowColor} opacity={isActive ? '0.4' : '0.15'} />
    <rect x="52" y="48" width="8" height="8" fill={glowColor} opacity={isActive ? '0.3' : '0.1'} />
    <rect x="40" y="60" width="8" height="8" fill={glowColor} opacity={isActive ? '0.35' : '0.12'} />
    <rect x="52" y="60" width="8" height="8" fill={glowColor} opacity={isActive ? '0.4' : '0.15'} />
    <rect x="40" y="72" width="8" height="8" fill={glowColor} opacity={isActive ? '0.3' : '0.1'} />
    <rect x="52" y="72" width="8" height="8" fill={glowColor} opacity={isActive ? '0.35' : '0.12'} />
    <rect x="40" y="84" width="8" height="8" fill={glowColor} opacity={isActive ? '0.4' : '0.15'} />
    <rect x="52" y="84" width="8" height="8" fill={glowColor} opacity={isActive ? '0.3' : '0.1'} />
    {/* Top antenna */}
    <line x1="50" y1="35" x2="50" y2="45" stroke={glowColor} strokeWidth="1.5" />
    <circle cx="50" cy="35" r="2" fill={glowColor} opacity={isActive ? '1' : '0.5'} />
    {isActive && (
      <>
        <circle cx="50" cy="35" r="8" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.4" className="animate-pulse" />
        <rect x="36" y="43" width="28" height="69" fill="none" stroke={glowColor} strokeWidth="1.5" opacity="0.3" />
      </>
    )}
  </g>
);

const ArenaBuilding: React.FC<{ glowColor: string; isActive: boolean }> = ({ glowColor, isActive }) => (
  <g className="building-arena">
    {/* Circular base */}
    <circle cx="50" cy="85" r="22" fill="#1e1b4b" stroke={glowColor} strokeWidth="1.5" />
    <circle cx="50" cy="85" r="18" fill="#0f172a" stroke={glowColor} strokeWidth="1" />
    {/* Dome structure */}
    <ellipse cx="50" cy="70" rx="20" ry="15" fill="#312e81" stroke={glowColor} strokeWidth="1" opacity="0.8" />
    {/* Segments */}
    <line x1="32" y1="85" x2="68" y2="85" stroke={glowColor} strokeWidth="0.5" opacity="0.4" />
    <line x1="50" y1="63" x2="50" y2="107" stroke={glowColor} strokeWidth="0.5" opacity="0.4" />
    {/* Center podium */}
    <circle cx="50" cy="85" r="6" fill={glowColor} opacity={isActive ? '0.6' : '0.3'} />
    {/* Entrance lights */}
    <rect x="48" y="105" width="4" height="5" fill={glowColor} opacity={isActive ? '0.8' : '0.4'} />
    {isActive && (
      <circle cx="50" cy="85" r="28" fill="none" stroke={glowColor} strokeWidth="1.5" opacity="0.3" className="animate-pulse" />
    )}
  </g>
);

const CyberTowerBuilding: React.FC<{ glowColor: string; isActive: boolean }> = ({ glowColor, isActive }) => (
  <g className="building-cyber">
    {/* Main structure - wider base tapering up */}
    <polygon points="35,110 44,50 56,50 65,110" fill="#0f172a" stroke={glowColor} strokeWidth="1" />
    {/* Inner structure */}
    <polygon points="38,105 45,55 55,55 62,105" fill="#1e1b4b" opacity="0.8" />
    {/* Signal beam lines */}
    <line x1="50" y1="50" x2="50" y2="35" stroke={glowColor} strokeWidth="2" opacity={isActive ? '0.8' : '0.3'} />
    <line x1="50" y1="50" x2="40" y2="40" stroke={glowColor} strokeWidth="1" opacity={isActive ? '0.6' : '0.2'} />
    <line x1="50" y1="50" x2="60" y2="40" stroke={glowColor} strokeWidth="1" opacity={isActive ? '0.6' : '0.2'} />
    {/* Signal orb */}
    <circle cx="50" cy="35" r="4" fill={glowColor} opacity={isActive ? '1' : '0.5'} />
    {isActive && (
      <>
        <circle cx="50" cy="35" r="10" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.4" className="animate-pulse" />
        <circle cx="50" cy="35" r="16" fill="none" stroke={glowColor} strokeWidth="0.5" opacity="0.2" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
      </>
    )}
    {/* Tech panels */}
    <rect x="42" y="65" width="16" height="3" fill={glowColor} opacity={isActive ? '0.5' : '0.2'} />
    <rect x="43" y="75" width="14" height="3" fill={glowColor} opacity={isActive ? '0.5' : '0.2'} />
    <rect x="44" y="85" width="12" height="3" fill={glowColor} opacity={isActive ? '0.5' : '0.2'} />
    <rect x="45" y="95" width="10" height="3" fill={glowColor} opacity={isActive ? '0.5' : '0.2'} />
  </g>
);

export const BlockCityMap: React.FC<BlockCityMapProps> = ({ rooms, onEnterRoom, onBack }) => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const getGlowColor = (status: string): string => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in-progress': return '#fbbf24';
      default: return '#7c3aed';
    }
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Beginner': return 'text-[#22c55e] border-[#22c55e]/40 bg-[#22c55e]/10';
      case 'Intermediate': return 'text-[#fbbf24] border-[#fbbf24]/40 bg-[#fbbf24]/10';
      case 'Advanced': return 'text-[#ef4444] border-[#ef4444]/40 bg-[#ef4444]/10';
      default: return 'text-white/60 border-white/20 bg-white/5';
    }
  };

  const getBuildingComponent = (buildingType: string, glowColor: string, isActive: boolean) => {
    switch (buildingType) {
      case 'courthouse': return <CourthouseBuilding glowColor={glowColor} isActive={isActive} />;
      case 'vault': return <VaultBuilding glowColor={glowColor} isActive={isActive} />;
      case 'tower': return <TowerBuilding glowColor={glowColor} isActive={isActive} />;
      case 'arena': return <ArenaBuilding glowColor={glowColor} isActive={isActive} />;
      case 'cyber': return <CyberTowerBuilding glowColor={glowColor} isActive={isActive} />;
      default: return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-[#fbbf24]" />;
      default: return <Lock className="w-5 h-5 text-white/40" />;
    }
  };

  const hoveredRoomData = hoveredRoom ? rooms.find(r => r.id === hoveredRoom) : null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          filter: hoveredRoom ? 'brightness(0.4)' : 'brightness(0.6)'
        }}
      />

      {/* Neon Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#7c3aed" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Map Container */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <div className="relative w-full max-w-6xl h-full">
          {/* Buildings positioned on the map */}
          {rooms.map((room) => {
            const isHovered = hoveredRoom === room.id;
            const glowColor = getGlowColor(room.status);
            
            return (
              <motion.div
                key={room.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${room.position.x}%`,
                  top: `${room.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: isHovered ? 1.15 : 1,
                  filter: isHovered ? `drop-shadow(0 0 30px ${glowColor})` : `drop-shadow(0 0 10px ${glowColor})`
                }}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  width="100" 
                  height="120" 
                  viewBox="0 0 100 120"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 20px ${glowColor})` : 'none',
                  }}
                >
                  {getBuildingComponent(room.buildingType, glowColor, isHovered)}
                </svg>
                
                {/* Room Name Label */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div 
                    className="px-3 py-1 rounded-lg text-xs font-bold text-center"
                    style={{
                      background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 27, 75, 0.9))`,
                      border: `1px solid ${glowColor}`,
                      boxShadow: isHovered ? `0 0 20px ${glowColor}` : `0 0 10px ${glowColor}`,
                      color: glowColor
                    }}
                  >
                    {room.name}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Side Information Panel */}
        <AnimatePresence>
          {hoveredRoomData && (
            <motion.div
              className="absolute right-0 top-0 h-full w-[400px] z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="h-full p-8 flex items-center">
                <div 
                  className="w-full rounded-2xl p-8 backdrop-blur-xl border relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 27, 75, 0.95))',
                    borderColor: getGlowColor(hoveredRoomData.status),
                    boxShadow: `0 0 40px ${getGlowColor(hoveredRoomData.status)}`,
                  }}
                >
                  {/* Animated background effect */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${getGlowColor(hoveredRoomData.status)}, transparent 70%)`
                    }}
                  />

                  <div className="relative z-10 space-y-6">
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-white">{hoveredRoomData.name}</h2>
                        {getStatusIcon(hoveredRoomData.status)}
                      </div>
                      <StatusBadge status={hoveredRoomData.status} />
                    </div>

                    {/* Topic */}
                    <div className="space-y-2">
                      <p className="text-sm text-white/60 uppercase tracking-wider">Topic</p>
                      <p className="text-lg font-medium text-white">{hoveredRoomData.topic}</p>
                    </div>

                    {/* Points */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/20 to-[#f59e0b]/20 border border-[#fbbf24]/40">
                      <span className="text-white/80">Reward Points</span>
                      <span className="text-2xl font-bold text-[#fbbf24]">{hoveredRoomData.points}</span>
                    </div>

                    {/* Difficulty */}
                    <div className="space-y-2">
                      <p className="text-sm text-white/60 uppercase tracking-wider">Difficulty Level</p>
                      <div className={`inline-block px-4 py-2 rounded-lg border text-sm font-bold ${getDifficultyColor(hoveredRoomData.difficulty)}`}>
                        {hoveredRoomData.difficulty}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <p className="text-sm text-white/60 uppercase tracking-wider">Description</p>
                      <p className="text-sm text-white/80 leading-relaxed">{hoveredRoomData.description}</p>
                    </div>

                    {/* Action Button */}
                    <BlockCityButton
                      variant="primary"
                      size="lg"
                      onClick={() => onEnterRoom?.(hoveredRoomData.id)}
                      disabled={hoveredRoomData.status === 'completed'}
                      className="w-full"
                    >
                      {hoveredRoomData.status === 'completed' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 inline mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          Enter Room
                          <ChevronRight className="w-5 h-5 inline ml-2" />
                        </>
                      )}
                    </BlockCityButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instruction overlay when no room is hovered */}
        <AnimatePresence>
          {!hoveredRoom && (
            <>
              <motion.div
                className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.h1 
                  className="text-5xl md:text-6xl font-black gradient-text mb-3"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  BLOCKCITY
                </motion.h1>
                <div className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7c3aed]/30 to-[#ec4899]/30 backdrop-blur-lg border border-[#7c3aed]/50">
                  <p className="text-white text-sm font-medium">
                    Hover over buildings to explore rooms
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Back Button */}
        {onBack && (
          <motion.div
            className="absolute top-8 left-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <BlockCityButton
              variant="secondary"
              size="sm"
              onClick={onBack}
              className="w-full"
            >
              <ArrowLeft className="w-5 h-5 inline mr-2" />
              Back
            </BlockCityButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};