import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';
import { useState } from 'react';
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

interface ArticleParamsFormProps {
	selectedFontFamily: OptionType;
	setSelectedFontFamily: (selectedFontFamily: OptionType) => void;
	selectedFontSize: OptionType;
	setSelectedFontSize: (selectedFontSize: OptionType) => void;
	selectedFontColor: OptionType;
	setSelectedFontColor: (selectedFontColor: OptionType) => void;
	selectedBackgroundColor: OptionType;
	setSelectedBackgroundColor: (selectedBackgroundColor: OptionType) => void;
	selectedContentWidth: OptionType;
	setSelectedContentWidth: (selectedContentWidth: OptionType) => void;
}

export const ArticleParamsForm = ({
	selectedFontFamily,
	setSelectedFontFamily,
	selectedFontSize,
	setSelectedFontSize,
	selectedFontColor,
	setSelectedFontColor,
	selectedBackgroundColor,
	setSelectedBackgroundColor,
	selectedContentWidth,
	setSelectedContentWidth,
}: ArticleParamsFormProps) => {
	// Состояние формы
	const [formVisible, setFormVisible] = useState(false);

	// Хранение локальных значений полей формы специально реализовано здесь, так как при их изменении не должно происходить их применение
	// Дефолтное значение состояния приходит в качестве пропсов из родителя.
	const [localFontFamily, setLocalFontFamily] = useState(selectedFontFamily);
	const [localFontSize, setLocalFontSize] = useState(selectedFontSize);
	const [localFontColor, setLocalFontColor] = useState(selectedFontColor);
	const [localBackgroundColor, setLocalBackgroundColor] = useState(
		selectedBackgroundColor
	);
	const [localContentWidth, setLocalContentWidth] =
		useState(selectedContentWidth);

	const toggleFormVisibility = () => setFormVisible(!formVisible);

	// Применение изменений. Локальные значения передаются вверх, используя методы set из пропсов.
	const applyChanges = () => {
		setSelectedFontFamily(localFontFamily);
		setSelectedFontSize(localFontSize);
		setSelectedFontColor(localFontColor);
		setSelectedBackgroundColor(localBackgroundColor);
		setSelectedContentWidth(localContentWidth);
	};

	// Сброс изменений. Передаем дефолтные значения
	const resetChanges = () => {
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<>
			<ArrowButton onClick={toggleFormVisibility} isOpen={formVisible} />
			{formVisible && (
				<aside
					className={clsx(
						styles.container,
						formVisible && styles.container_open
					)}>
					<form className={styles.form}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
							Задайте параметры
						</Text>
						<Spacing />
						{/*

						В качестве пропса selected у компонента Select здесь локальное значение.
						Мы передадим его вверх при нажатии на кнопку "Применить"

						*/}

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
							<Button title='Применить' type='button' onClick={applyChanges} />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
