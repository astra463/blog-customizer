import { useState, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	// У приложения есть своё состояние, которое может меняться с помощью метода set,
	// Изначально оно инициализированы дефолтным состоянием приложения

	const [formState, setFormState] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formState.fontFamily.value,
					'--font-size': formState.fontSize.value,
					'--font-color': formState.fontColor.value,
					'--container-width': formState.contentWidth.value,
					'--bg-color': formState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm formState={formState} setFormState={setFormState} />
			<Article />
		</div>
	);
};
