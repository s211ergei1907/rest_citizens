import {TextInput, Button, Group, Box, Modal} from '@mantine/core';
import {useForm} from '@mantine/form';
import React, {useEffect, useState} from "react";
import {isOver18} from "./modalUser/utils/DateUtils";
import {formatPhoneNumber} from "./modalUser/utils/FormatPhone";
import {useEditCitizen} from "../../hooks/fetch/useCitizens";

export const ModalEditUser: React.FC<{ id: string | undefined, data: any; }> = (props) => {
    const [opened, setOpen] = useState(false);
    const {data, id} = props;

    const {editCitizen} = useEditCitizen(id);


    const form = useForm({

        initialValues: {
            ...data
        },

        validate: {
            lastName: (value) => value !== '' ? null : 'Поле не может быть пустым',
            firstName: (value) => value !== '' ? null : 'Поле не может быть пустым',
            birthDate: (value) => isOver18(value) ? null : 'Человеку не может быть меньше 18 лет',
            phone: (value) => value !== '' ? null : 'Поле не может быть пустым',
            extraPhone: (value) => value !== '' ? null : 'Поле не может быть пустым',
            dulSeries: (value) => value.toString().length === 4 ? null : 'Серия паспорта должна состоять из 4 цифр',
            dulNumber: (value) => value.toString().length === 6 ? null : 'Номер паспорта должна состоять из 6 цифр',
        },
    });

    const handleSubmit = async (values: any) => {
        const formattedPhone = formatPhoneNumber(values.phone);
        const formattedExtraPhone = formatPhoneNumber(values.extraPhone);
        const dulSeriesNumb: number = typeof values.dulSeries === 'number' ? values.dulSeries : parseInt(values.dulSeries, 10);
        const dulNumberNumb: number = typeof values.dulNumber === 'number' ? values.dulNumber : parseInt(values.dulNumber, 10);

        await editCitizen({
            ...values,
            phone: formattedPhone,
            extraPhone: formattedExtraPhone,
            dulSeries: dulSeriesNumb,
            dulNumber: dulNumberNumb
        });

        setOpen(false);

    };
    useEffect(() => {
        form.initialize({...data}) // решение проблемы со старыми данными после редактиврования после повторного открытия формы

    }, [data]);


    return (
        <>
            <Modal opened={opened} onClose={() => setOpen(false)} title="Добавление гражданина">
                <Box maw={390} mx="auto">
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput
                            withAsterisk
                            label="Фамилия"
                            placeholder={"Фамилия"}
                            {...form.getInputProps('lastName')}
                        />
                        <TextInput
                            withAsterisk
                            label="Имя"
                            placeholder="Введите имя"
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            label="Отчество"
                            placeholder="Введите отчество, если оно у вас есть"
                            {...form.getInputProps('middleName')}
                        />
                        <TextInput
                            withAsterisk
                            label="Дата рождения"
                            type="date"
                            placeholder="Введите дату рождения"
                            {...form.getInputProps('birthDate')}
                        />
                        <TextInput
                            withAsterisk
                            label="Телефон"
                            placeholder="Введите телефон в формате 79519457780"
                            {...form.getInputProps('phone')}
                            inputMode="numeric"
                            type="text"
                            min="70000000000"
                            max="79999999999"
                        />
                        <TextInput
                            withAsterisk
                            label="Необязательный телефон"
                            placeholder="Введите телефон в формате 79519457780"
                            {...form.getInputProps('extraPhone')}
                            inputMode="numeric"
                            min="70000000000"
                            max="79999999999"
                            type="text"
                        />
                        <TextInput
                            withAsterisk
                            label="Серия паспорта"
                            placeholder="Введите серию паспорта, серия должна содержать 4 цифры"
                            {...form.getInputProps('dulSeries')}
                            inputMode="numeric"
                            type="number"
                        />
                        <TextInput
                            withAsterisk
                            label="Номер паспорта"
                            placeholder="Номер паспорта должен содержать 6 цифр"
                            {...form.getInputProps('dulNumber')}
                            type="number"
                        />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Сохранить</Button>
                        </Group>
                    </form>
                </Box>
            </Modal>
            <Button onClick={() => setOpen(true)}>Редактировать</Button>
        </>

    );
}