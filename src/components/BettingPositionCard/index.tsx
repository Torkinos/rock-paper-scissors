import { FC, MouseEvent } from 'react';
import styles from './bettingPositionCard.module.scss';
import { hexToRGBA } from 'src/utils/hexToRGBA';
import classNames from 'classnames';

interface BettingPositionCardProps {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	amount?: number;
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
	return (
		<button
			className={classNames(
				styles.bettingPositionCard,
				isActive && styles.active
			)}
			onClick={onClick}
			style={{
				backgroundColor: hexToRGBA(color, isActive ? 60 : 30),
				borderColor: hexToRGBA(color, isActive ? 100 : 50),
			}}
		>
			{!!amount && <div className={styles.amount}>{amount}</div>}

			<div
				className={styles.title}
				style={{
					color: hexToRGBA(color, isActive ? 100 : 50),
				}}
			>
				{title}
			</div>
		</button>
	);
};
