import { Position } from 'src/enums/position.enum';

export const getPlayerChoicesCount = (
	playerBettings: Partial<Record<Position, number>>
): number => {
	return (Object.keys(playerBettings) as (keyof typeof playerBettings)[])
		.length;
};
