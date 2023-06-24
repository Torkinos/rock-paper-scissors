import { Position } from 'src/enums/position.enum';

export const getPlayerChoicesCount = (
	playerBettings: Partial<Record<Position, number>>
): number => {
	return Object.values(playerBettings).filter((betting) => !!betting).length;
};
