import React, {useState} from 'react';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import {
    MantineReactTable,
    MRT_RowSelectionState,
    useMantineReactTable,
    MRT_ColumnDef,
} from 'mantine-react-table';
import {columns} from './Citizens.utils';
import {Button, Loader, Text} from '@mantine/core';
import {useCitizens, useDeleteCitizen} from '../../hooks/fetch/useCitizens';
import {modals, ModalsProvider} from '@mantine/modals';
import {ModalAddUser} from "../../components/modal/ModalAddUser";
import {Link, useNavigate} from "react-router-dom";
import {LinkTo} from "../../utils/LinkTo";


const Citizens = () => {

    const navigate = useNavigate();
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const {data: citizens = [], isLoading} = useCitizens();

    const deleteCitizenMutation = useDeleteCitizen();

    const handleDeleteCitizen = async (rowSelection: MRT_RowSelectionState) => {
        let digitsOnlyArrayRowSelection = Object.keys(rowSelection)
            .filter(key => !isNaN(parseInt(key)))
            .map(Number);

        if (digitsOnlyArrayRowSelection.length === 1) {
            const id = digitsOnlyArrayRowSelection[0];
            deleteCitizenMutation.mutate(id);
            setRowSelection({});
        } else {
            console.log('Что-то пошло не так');
        }
    };
    const editColumn: MRT_ColumnDef<any, any> = {
        header: 'link',
        accessorKey: 'link',
        Cell: ({row}: any) => (
            <Link to={LinkTo.citizen(row.id)}><Button>Открыть гражданина</Button></Link>
        ),
    };

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Delete your profile',
            centered: true,
            children: (
                <Text size="sm">
                    Вы уверены, что хотите удалить человека? Это действие необратимо
                </Text>
            ),
            labels: {confirm: 'Delete account', cancel: "No don't delete it"},
            confirmProps: {color: 'red'},
            onCancel: () => console.log('Пользователь нажал отмену'),
            onConfirm: () => handleDeleteCitizen(rowSelection),
        });

    const table = useMantineReactTable({
        columns: [editColumn, ...columns],
        data: citizens,
        createDisplayMode: 'modal',
        enableRowSelection: true,
        getRowId: (row) => row.id.toString(),
        onRowSelectionChange: setRowSelection,
        state: {rowSelection},

    });

    return (
        <>
            <ModalsProvider labels={{confirm: 'Submit', cancel: 'Cancel'}}>
                {isLoading ? (
                    <div style={{margin: '200px auto', width: 'fit-content'}}>
                        <Loader/>
                    </div>
                ) : (
                    <>
                        <div style={{maxWidth: '95%', margin: '0 auto', backgroundColor: '#f3f3f3', marginTop: '30px'}}>
                            <div style={{padding: "10px 10px"}}>

                                <Button
                                    onClick={openDeleteModal}
                                    style={{marginRight: "10px"}}
                                    color="red"
                                    disabled={Object.keys(rowSelection).length !== 1}>Удалить
                                </Button>
                                <ModalAddUser/>
                            </div>

                            <div>
                                <MantineReactTable
                                    table={table}
                                />
                            </div>
                        </div>
                    </>
                )}
            </ModalsProvider>
        </>
    );
};

export default Citizens;