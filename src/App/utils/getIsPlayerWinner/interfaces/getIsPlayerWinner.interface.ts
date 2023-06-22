import { Position } from 'src/enums/position.enum';

export interface GetIsPlayerWinnerParams {
	playerChoice: Position;
	computerChoice: Position;
	bettingChoice: Position;
}
