import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { DataTable } from 'react-native-paper';
import { useState } from 'react';


interface DataTableWithPaginationProps {
	data: { id: number, name: string, studentCount: number }[],
	dataTableHeaders: string[],
	optionsPerPage: number,
}


const DataTableWithPagination: React.FC<DataTableWithPaginationProps> = ({ data, dataTableHeaders, optionsPerPage }): JSX.Element => {
	
	const [page, setPage] = useState<number>(0);
	const [itemsPerPage, setItemsPerPage] = useState<number>(optionsPerPage);

	const numberOfPages = Math.ceil(data.length / itemsPerPage);

	const totalItems = data.length;
	const getCurrentPageItemLower = () => { (page * itemsPerPage)+1 };
	const getCurrentPageItemHigher = () => { (page * itemsPerPage) + itemsPerPage };

	const getDataTablePageLabel = () => {
		const lowerEnd = (page * itemsPerPage) + 1;
		var higherEnd = (page * itemsPerPage) + itemsPerPage;

		higherEnd = Math.min(higherEnd, totalItems);
		
		if (lowerEnd == higherEnd) {
			return `${lowerEnd} of ${totalItems}`;
		}

		return `${lowerEnd}-${higherEnd} of ${totalItems}`;
	};

	const extendRowInfo = (rowID: number) => {
		const teacherName = data.find((row: any) => row?.id == rowID)?.name;
		console.log("Show info of teacher of id ", rowID, ", which is ", teacherName)
	}

	if (data.length === 0) {
		return <></>;
	}

	console.log("Re-render at ", new Date())

	return (
		<View style={styles.container}>

			<DataTable >
				<DataTable.Header>
					{dataTableHeaders && dataTableHeaders.map((header) => {
							return (
								<DataTable.Title key={header} >{header}</DataTable.Title>
							)
					})}
				</DataTable.Header>


				{data.slice((page * itemsPerPage), (page * itemsPerPage) + itemsPerPage).map((row: any, index: any) => {
					return (
						<DataTable.Row key={row.id} onPress={() => { extendRowInfo(row.id) }}>
							<DataTable.Cell>{row.id}</DataTable.Cell>
							<DataTable.Cell>{row.name}</DataTable.Cell>
							<DataTable.Cell>{row.studentCount}</DataTable.Cell>
						</DataTable.Row>
					)
				})}
				

				<DataTable.Pagination
					page={page}
					numberOfPages={numberOfPages}
					onPageChange={(page) => setPage(page)}
					label={getDataTablePageLabel()}
					numberOfItemsPerPage={itemsPerPage}
					onItemsPerPageChange={setItemsPerPage}
					showFastPaginationControls={false}
				/>

			</DataTable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
});

export default DataTableWithPagination;