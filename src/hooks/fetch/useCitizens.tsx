import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {axiosConfig} from '../../axios';
import {CitizenType} from "../../pages/citizens/Citizen.type";
import {notifications} from '@mantine/notifications';
import axios from "axios";

export const citizensKeys = {
    all: ['citizens'] as const,
    citizen: (id: string) => ['citizens', id] as const
}

export const useCitizens = () => {
    return useQuery<CitizenType[]>({
        queryKey: citizensKeys.all,
        queryFn: async () => {
            const {data} = await axiosConfig.get<CitizenType[]>(citizensKeys.all[0]);
            return data;
        }
    });
}

export const useAddCitizen = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: CitizenType) => axiosConfig.post('/citizens', data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: citizensKeys.all});
            notifications.show({
                title: 'Гражданин успешно создан',
                message: '😅',
                color: "green",
                autoClose: 3000,
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Гражданин не получилось создать',
                message: `${error}! 🤥`,
                color: "red",
                autoClose: 3000,
            })
        }
    });

    const addCitizen = async (formData: CitizenType) => {
        try {
            await mutation.mutateAsync(formData);

        } catch (error) {
            console.error("Ошибка при создании гражданина:", error);
        }
    };

    return {addCitizen};
};
export const useEditCitizen = (id: string | undefined) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: CitizenType) => axiosConfig.put(`/citizens/${data.id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['citizen', id]});
            notifications.show({
                title: 'Данные гражданина успешно обновлены',
                message: '😅',
                color: "green",
                autoClose: 3000,
            });
        },
        onError: (error) => {
            notifications.show({
                title: 'Не удалось обновить данные гражданина',
                message: `${error}! 🤥`,
                color: "red",
                autoClose: 3000,
            });
        }
    });

    const editCitizen = async (formData: CitizenType) => {
        try {
            await mutation.mutateAsync(formData);
        } catch (error) {
            console.error("Ошибка при обновлении данных гражданина:", error);
        }
    };

    return {editCitizen};
};

export const useCitizen = (id: string | undefined) => {
    return useQuery<CitizenType>({
        queryKey: ['citizen', id],
        queryFn: async () => {
            const {data} = await axiosConfig.get<CitizenType>(`${citizensKeys.all[0]}/${id}`);
            return data;
        }
    });
}
export const useDeleteCitizen = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => {
            return axiosConfig.delete(`${citizensKeys.all[0]}/${id}`)
        },
        onError: (error, variables, context) => {
            console.error('Ошибка при удалении гражданина:', error);
            notifications.show({
                title: 'Гражданин не получилось удалить',
                message: `${error}! 🤥`,
                color: "red",
                autoClose: 3000,

            })
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({queryKey: citizensKeys.all});
            notifications.show({
                title: 'Гражданин успешно удален',
                message: 'Такие вот дела! 🤥',
                color: "green",
                autoClose: 3000,

            })
        },
    })
}
