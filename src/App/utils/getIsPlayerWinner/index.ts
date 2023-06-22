import { BETTING_POSITIONS } from 'src/constants/bettingPositions';
import { GetIsPlayerWinnerParams } from './interfaces/getIsPlayerWinner.interface';
import { BettingPosition } from 'src/constants/bettingPositions/interfaces/bettingPositions.interface';

export const getIsPlayerWinner = ({
	playerChoice,
	computerChoice,
	bettingChoice,
}: GetIsPlayerWinnerParams): boolean => {
	const playerChoiceData = BETTING_POSITIONS[playerChoice];
	const computerChoiceData = BETTING_POSITIONS[computerChoice];

	const playerWinsAgainst = playerChoiceData.winsAgainst;
	const computerWinsAgainst = computerChoiceData.winsAgainst;

	return (
		(playerWinsAgainst.includes(computerChoice) &&
			playerChoice === bettingChoice) ||
		(computerWinsAgainst.includes(playerChoice) &&
			computerChoice === bettingChoice)
	);
};
