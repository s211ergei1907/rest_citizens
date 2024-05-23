export interface CitizenType {
    id: number;
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    phone: string;
    extraPhone: string | null;
    dulSeries: number | null;
    dulNumber: number | null;
}