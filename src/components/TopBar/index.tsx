import { FC } from 'react';
import styles from './topBar.module.scss';

interface TopBarProps {
	balance: number;
	betAmount: number;
	winAmount: number;
}

export const TopBar: FC<TopBarProps> = ({ balance, betAmount, winAmount }) => {
	return (
		<div className={styles.topBar}>
			<div className={styles.title}>
				Balance:&nbsp;
				<span>{balance}</span>
			</div>

			<div className={styles.title}>
				Bet amount:&nbsp;
				<span>{betAmount}</span>
			</div>

			{winAmount > 0 && (
				<div className={styles.title}>
					Win amount:&nbsp;
					<span>{winAmount}</span>
				</div>
			)}
		</div>
	);
};
