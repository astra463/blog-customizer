import { useState, StrictMode, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	// У приложения есть свои состояния, которые могут меняться с помощью методов set,
	// которые мы передаём компоненту ArticleParamsForm в качестве пропсов.
	// Изначально они инициализированы дефолтным значением

	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectedFontFamily.value,
					'--font-size': selectedFontSize.value,
					'--font-color': selectedFontColor.value,
					'--container-width': selectedContentWidth.value,
					'--bg-color': selectedBackgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				selectedFontFamily={selectedFontFamily}
				setSelectedFontFamily={setSelectedFontFamily}
				selectedFontSize={selectedFontSize}
				setSelectedFontSize={setSelectedFontSize}
				selectedFontColor={selectedFontColor}
				setSelectedFontColor={setSelectedFontColor}
				selectedBackgroundColor={selectedBackgroundColor}
				setSelectedBackgroundColor={setSelectedBackgroundColor}
				selectedContentWidth={selectedContentWidth}
				setSelectedContentWidth={setSelectedContentWidth}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
