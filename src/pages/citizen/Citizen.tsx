import React from 'react';
import {Card, Image, Text, Group, Loader} from "@mantine/core";
import {useParams} from "react-router-dom";
import {useCitizen} from "../../hooks/fetch/useCitizens";
import {ModalEditUser} from "../../components/modal/ModalEditUser";

const Citizen = () => {
    const {id} = useParams();
    const {data, isLoading} = useCitizen(id);

    if (isLoading) {
        return (
            <div style={{margin: "200px auto", width: "fit-content"}}>
                <Loader/>
            </div>
        );
    }

    return (
        <div style={{margin: "30px auto", maxWidth: "1320px", minHeight: "700px"}}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
                        height={160}
                        alt="Norway"
                    />
                </Card.Section>

                <Card.Section style={{padding: "0 30px"}}>
                    <Group justify="space-between" mt="md" mb="xs">
                        <Text size="lg" fw={700}>{data?.lastName} {data?.firstName} {data?.middleName}</Text>
                        {data && (
                            <ModalEditUser
                                id={id}
                                data={data}
                            />
                        )}
                    </Group>

                    <Text size="lg" c="dimmed" style={{marginBottom: '10px'}}>
                        <span style={{fontWeight: 'bold'}}>Дата рождения:</span> {data?.birthDate}
                    </Text>
                    <Text size="lg" c="dimmed" style={{marginBottom: '10px'}}>
                        <span style={{fontWeight: 'bold'}}>Телефон:</span> {data?.phone}
                    </Text>
                    <Text size="lg" c="dimmed" style={{marginBottom: '10px'}}>
                        <span style={{fontWeight: 'bold'}}>Дополнительный телефон:</span> {data?.extraPhone}
                    </Text>
                    <Text size="lg" c="dimmed" style={{marginBottom: '10px'}}>
                        <span style={{fontWeight: 'bold'}}>Серия паспорта:</span> {data?.dulSeries}
                    </Text>
                    <Text size="lg" c="dimmed" style={{marginBottom: '10px'}}>
                        <span style={{fontWeight: 'bold'}}>Номер паспорта:</span> {data?.dulNumber}
                    </Text>
                </Card.Section>
            </Card>
        </div>
    );
};

export default Citizen;
