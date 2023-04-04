export interface ServiceContract {
    contractNumber: string;
    managerialCompany: {
        name: string;
        readingRegistrationPeriod: {
            value: string;
        };
    };
}

export interface UserData {
    address: string;
    serviceContract: ServiceContract;
}

export interface UserDataState {
    userData: UserData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export type UserState = {
    accessToken: string;
    refreshToken: string;
    userData: UserData | null;
    meteringDevice: MeteringDevice[] | null;
};

export interface MeteringDevice {
    id: string;
    number: string;
    facility: string;
    lastReadingDate: string;
    lastReadingValue: number;
    todayReadingDate: string | null;
    todayReadingValue: number | null
}

type MeterReading = {
    muId: number;
    readings: number;
};

export type MeterReadingData = {
    id: number;
    needSave: boolean;
    readings: MeterReading[];
};


