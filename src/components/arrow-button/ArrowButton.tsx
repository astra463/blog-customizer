import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { MouseEventHandler } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (event: MouseEvent) => void;

interface ArrowButtonProps {
	onClick: MouseEventHandler<HTMLDivElement>;
	isOpen: boolean;
}

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}
			className={clsx(styles.container, isOpen && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
