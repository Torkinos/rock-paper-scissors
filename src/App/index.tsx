import { FC, useMemo, useState } from 'react';
import { Position } from 'src/enums/position.enum';
import { Result } from './enums/result.enum';
import { BET_STEP } from 'src/constants/betStep';
import { MAX_BET_COUNT } from 'src/constants/maxBetCount';
import { WINING_RATE_FOR_BET } from 'src/constants/winningRateForBet';
import { Stage } from './enums/stage.enum';
import { BETTING_POSITIONS } from 'src/constants/bettingPositions';
import { INITIAL_BALANCE } from 'src/constants/initialBalance';
import { Button } from 'src/components/Button';
import { TopBar } from 'src/components/TopBar';
import { BettingPositionCard } from 'src/components/BettingPositionCard';
import { getPlayerChoicesCount } from './utils/getPlayerChoicesCount';
import { ButtonType } from 'src/components/Button/enums/buttonType.enum';
import styles from './app.module.scss';

export const App: FC = () => {
	const [balance, setBalance] = useState(INITIAL_BALANCE);

	const [winAmount, setWinAmount] = useState(0);

	const [totalWinAmount, setTotalWinAmount] = useState(0);

	const [bettings, setBettings] = useState<Partial<Record<Position, number>>>(
		{}
	);

	const [result, setResult] = useState<Result | null>(null);

	const [stage, setStage] = useState(Stage.BETTING);

	const [playerChoice, setPlayerChoice] = useState<Position | null>(null);

	const [computerChoice, setComputerChoice] = useState<Position | null>(null);

	const [winningPosition, setWinningPosition] = useState<Position | null>(null);

	const totalBet = useMemo(() => {
		return Object.values(bettings).reduce(
			(acc, betAmount) => acc + betAmount,
			0
		);
	}, [bettings]);

	const onPlayAgain = () => {
		setComputerChoice(null);

		setPlayerChoice(null);

		setWinningPosition(null);

		setResult(null);

		setWinAmount(0);

		setBettings({});

		setBalance((prevstate) => prevstate + winAmount);

		setTotalWinAmount((prevstate) => prevstate + winAmount);

		setStage(Stage.BETTING);
	};

	const onResult = (
		playerChoiceParam: Position,
		computerChoiceParam: Position
	) => {
		let winnings = 0;

		if (playerChoiceParam === computerChoiceParam) {
			winnings += totalBet;

			setResult(Result.TIE);

			setStage(Stage.RESULT);

			setWinAmount(winnings);

			return;
		}

		const isPlayerPositionWinner =
			BETTING_POSITIONS[playerChoiceParam].winsAgainst.includes(
				computerChoiceParam
			);

		const winningChoice = isPlayerPositionWinner
			? playerChoiceParam
			: computerChoiceParam;

		Object.entries(bettings).forEach(([betting, betAmount]) => {
			const bettingChoice = betting as keyof typeof bettings;
			const playerChoicesCount = getPlayerChoicesCount(bettings);

			if (bettingChoice === winningChoice) {
				winnings += WINING_RATE_FOR_BET[playerChoicesCount] * betAmount;
			}
		});

		setResult(winnings > 0 ? Result.WIN : Result.LOSE);

		setWinningPosition(winningChoice);

		setStage(Stage.RESULT);

		setWinAmount(winnings);
	};

	const onPlay = () => {
		if (!playerChoice) {
			alert('Please select a choice');

			return;
		}

		const bettingPositionKeys = Object.keys(
			BETTING_POSITIONS
		) as (keyof typeof BETTING_POSITIONS)[];

		const randomChoice =
			bettingPositionKeys[
				Math.floor(Math.random() * bettingPositionKeys.length)
			];

		setComputerChoice(randomChoice);

		setStage(Stage.PLAY);

		setTimeout(() => {
			onResult(playerChoice, randomChoice);
		}, 1500);
	};

	const onIncrease = (choice: Position) => {
		if (stage !== Stage.BETTING) {
			return;
		}

		if (balance <= 0) {
			alert('You do not have enough balance to place this bet');

			return;
		}

		setBettings((prevState) => {
			const newBettings = {
				...prevState,
				[choice]: (prevState?.[choice] || 0) + BET_STEP,
			};

			const playerChoicesCount = getPlayerChoicesCount(newBettings);

			if (playerChoicesCount > MAX_BET_COUNT) {
				alert('You can only place 2 bets');

				return prevState;
			}

			return newBettings;
		});

		setBalance(balance - BET_STEP);
	};

	const onDecrease = (choice: Position) => {
		if (stage !== Stage.BETTING) {
			return;
		}

		if ((bettings?.[choice] || 0) <= 0) {
			alert('You do not have any bet on this position');

			return;
		}

		setBettings((prevState) => {
			return {
				...prevState,
				[choice]: (prevState?.[choice] || 0) - BET_STEP,
			};
		});

		setBalance(balance + BET_STEP);
	};

	const onSetChoice = (choice: Position) => {
		if (stage !== Stage.BETTING) {
			return;
		}

		setPlayerChoice(choice);
	};

	return (
		<div className={styles.app}>
			<TopBar
				betAmount={totalBet}
				balance={balance}
				winAmount={totalWinAmount}
			/>

			<div className={styles.gameArea}>
				{stage === Stage.PLAY && (
					<div className={styles.playStage}>
						{playerChoice}

						<span>vs</span>

						{computerChoice}
					</div>
				)}

				{stage === Stage.RESULT && (
					<>
						{winningPosition && (
							<div
								className={styles.winningPosition}
								style={{ color: BETTING_POSITIONS[winningPosition].color }}
							>
								{winningPosition} won
							</div>
						)}

						{result === Result.WIN && (
							<div className={styles.resultMessage}>
								You win <span>{winAmount}</span>!
							</div>
						)}

						{result === Result.LOSE && (
							<div className={styles.resultMessage}>
								You lost <span>{totalBet}</span>!
							</div>
						)}

						{result === Result.TIE && (
							<div className={styles.resultMessage}>It is a tie!</div>
						)}
					</>
				)}

				{stage === Stage.BETTING && (
					<div className={styles.bettingMessage}>Pick your positions</div>
				)}
			</div>

			<ul className={styles.positionsArea}>
				{Object.entries(BETTING_POSITIONS).map(([key, bettingPosition]) => {
					const choice = key as keyof typeof BETTING_POSITIONS;

					const betAmount = bettings[choice];

					return (
						<li key={choice} className={styles.position}>
							<div className={styles.betAmount}>
								<Button
									type={ButtonType.DENCE}
									onClick={() => onDecrease(choice)}
								>
									-
								</Button>
								&nbsp;
								<span>{BET_STEP}</span>
								&nbsp;
								<Button
									type={ButtonType.DENCE}
									onClick={() => onIncrease(choice)}
								>
									+
								</Button>
							</div>

							<BettingPositionCard
								onClick={() => onSetChoice(choice)}
								isActive={playerChoice === choice}
								title={bettingPosition.label}
								amount={betAmount}
								color={bettingPosition.color}
							/>
						</li>
					);
				})}
			</ul>

			<div className={styles.buttonWrapper}>
				{stage === Stage.BETTING && (
					<Button isDisabled={totalBet === 0 || !playerChoice} onClick={onPlay}>
						Play
					</Button>
				)}

				{stage === Stage.RESULT && (
					<Button onClick={onPlayAgain}>Play again</Button>
				)}
			</div>
		</div>
	);
};
