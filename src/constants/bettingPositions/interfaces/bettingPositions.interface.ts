import { Position } from 'src/enums/position.enum';

export interface BettingPosition {
	label: string;
	color: string;
	winsAgainst: Position[];
}
