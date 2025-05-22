import { useCakeStore } from '../lib/store';

interface LevelBadgeProps {
  level: number;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  // Calculate required XP for current level
  const calculateRequiredXP = (level: number): number => {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  };
  
  const experience = useCakeStore(state => state.player.experience);
  const requiredXP = calculateRequiredXP(level);
  const progress = Math.min(100, Math.floor((experience / requiredXP) * 100));
  
  return (
    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50/80 shadow-sm">
      <div className="flex flex-col items-center">
        <span className="text-xs text-primary-700">Level</span>
        <span className="font-bold text-primary-900">{level}</span>
      </div>
      
      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-600 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}