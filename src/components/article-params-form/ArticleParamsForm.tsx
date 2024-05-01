import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Spacing } from '../spacing/Spacing';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';
import { Text } from '../text/Text';

type FormState = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

interface ArticleParamsFormProps {
	formState: FormState;
	setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const ArticleParamsForm = ({
	formState,
	setFormState,
}: ArticleParamsFormProps) => {
	const [formVisible, setFormVisible] = useState(false);

	const [localFontFamily, setLocalFontFamily] = useState(formState.fontFamily);
	const [localFontSize, setLocalFontSize] = useState(formState.fontSize);
	const [localFontColor, setLocalFontColor] = useState(formState.fontColor);
	const [localBackgroundColor, setLocalBackgroundColor] = useState(
		formState.backgroundColor
	);
	const [localContentWidth, setLocalContentWidth] = useState(
		formState.contentWidth
	);

	const toggleFormVisibility = () => {
		setFormVisible((prevFormVisible) => !prevFormVisible);
		console.log('toggle');
	};

	const formRef = useRef<HTMLFormElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (
				formRef.current &&
				!formRef.current.contains(event.target as Node) &&
				arrowButtonRef.current &&
				!arrowButtonRef.current.contains(event.target as Node)
			) {
				toggleFormVisibility();
			}
		}

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [formRef.current, arrowButtonRef.current]);

	const applyChanges = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState({
			fontFamily: localFontFamily,
			fontSize: localFontSize,
			fontColor: localFontColor,
			backgroundColor: localBackgroundColor,
			contentWidth: localContentWidth,
		});
	};

	const resetChanges = () => {
		setFormState(defaultArticleState);
		setLocalFontFamily(defaultArticleState.fontFamily);
		setLocalFontSize(defaultArticleState.fontSize);
		setLocalFontColor(defaultArticleState.fontColor);
		setLocalBackgroundColor(defaultArticleState.backgroundColor);
		setLocalContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<>
			<ArrowButton
				onClick={toggleFormVisibility}
				isOpen={formVisible}
				containerRef={arrowButtonRef}
			/>
			{formVisible && (
				<aside
					className={clsx(
						styles.container,
						formVisible && styles.container_open
					)}>
					<form className={styles.form} ref={formRef} onSubmit={applyChanges}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Spacing />
						<Select
							selected={localFontFamily}
							options={fontFamilyOptions}
							onChange={setLocalFontFamily}
							title={'Шрифт'}
						/>
						<Spacing />
						<RadioGroup
							name={'font-size'}
							options={fontSizeOptions}
							selected={localFontSize}
							title={'Размер шрифта'}
							onChange={setLocalFontSize}
						/>
						<Spacing />
						<Select
							selected={localFontColor}
							options={fontColors}
							title={'Цвет шрифта'}
							onChange={setLocalFontColor}
						/>
						<Spacing />
						<Separator />
						<Spacing />
						<Select
							selected={localBackgroundColor}
							options={backgroundColors}
							title={'Цвет фона'}
							onChange={setLocalBackgroundColor}
						/>
						<Spacing />
						<Select
							selected={localContentWidth}
							options={contentWidthArr}
							title={'Ширина контента'}
							onChange={setLocalContentWidth}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='button' onClick={resetChanges} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
