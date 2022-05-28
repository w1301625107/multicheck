import React from 'react';
import { FC } from 'react';

type Props = {
	columns: number,
	children: React.ReactNode[]
}

const Column: FC<Props> = (props: Props): JSX.Element => {
	const { columns, children } = props

	const flatChildren: React.ReactNode[] = Array().concat(...children)
	const renderColumns: React.ReactNode[] = []
	const splictNum = Math.floor(flatChildren.length / columns)
	const extraOptionNum = flatChildren.length - splictNum * columns

	let i = columns, j = extraOptionNum
	while (i > 0 && flatChildren.length > 0) {
		renderColumns.push(
			<div
				key={i}
				className='MultiCheck_columns_col'>
				{
					flatChildren.splice(0, splictNum + (j > 0 ? 1 : 0)) // add extra option to first serval columns
				}
			</div>)
		i--
		j--
	}

	return <div className="MultiCheck_columns" >{renderColumns}</div>
}

Column.displayName = 'Column';

export { Column };
