import { FC, MouseEvent } from 'react';
import styles from './bettingPositionCard.module.scss';
import { hexToRGBA } from 'src/utils/hexToRGBA';

interface BettingPositionCardProps {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	amount: number;
	title: string;
	color: string;
	isActive?: boolean;
}

export const BettingPositionCard: FC<BettingPositionCardProps> = ({
	onClick,
	amount,
	title,
	color,
	isActive,
}) => {
	const activeColor = hexToRGBA(color, 100);
	const inactiveColor = hexToRGBA(color, 75);

	return (
		<button
			className={styles.bettingPositionCard}
			onClick={onClick}
			style={{
				backgroundColor: hexToRGBA(color, 60),
				borderColor: isActive ? activeColor : inactiveColor,
			}}
		>
			{amount && <div className={styles.amount}>{amount}</div>}

			<div
				className={styles.title}
				style={{
					color: isActive ? activeColor : inactiveColor,
				}}
			>
				{title}
			</div>
		</button>
	);
};
