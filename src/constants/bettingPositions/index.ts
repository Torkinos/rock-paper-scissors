import { Position } from 'src/enums/position.enum';
import { BettingPosition } from './interfaces/bettingPositions.interface';
import { COLORS } from '../colors';

export const BETTING_POSITIONS: { [key in Position]: BettingPosition } = {
	[Position.ROCK]: {
		label: 'Rock',
		color: COLORS.rpcBlue,
		winsAgainst: [Position.SCISSORS],
	},
	[Position.PAPER]: {
		label: 'Paper',
		color: COLORS.rpcGreen,
		winsAgainst: [Position.ROCK],
	},
	[Position.SCISSORS]: {
		label: 'Scissors',
		color: COLORS.rpcRed,
		winsAgainst: [Position.PAPER],
	},
};
