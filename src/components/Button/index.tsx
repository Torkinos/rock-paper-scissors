import { FC, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { ButtonType } from './enums/buttonType.enum';
import styles from './button.module.scss';

interface ButtonProps {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	children: ReactNode;
	type?: ButtonType;
}

export const Button: FC<ButtonProps> = ({
	onClick,
	children,
	type = ButtonType.BASE,
}) => {
	return (
		<button
			onClick={onClick}
			className={classNames(
				styles.button,
				type === ButtonType.DENCE && styles.dence
			)}
		>
			{children}
		</button>
	);
};
