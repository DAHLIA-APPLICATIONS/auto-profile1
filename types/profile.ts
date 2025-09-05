export type DynamicEntryBase = {
  id: string;
  [key: string]: string | undefined;
};

export interface Profile {
  name: string;
  nameKana: string;
  birthDate: string;
  address: string;
  gender: 'male' | 'female' | 'other' | '';
  phone: string;
  email: string;
  maritalStatus: 'married' | 'single' | '';
  dependents: string;
  educations: Education[];
  workHistories: WorkHistory[];
  qualifications: Qualification[];
}

export type Education = DynamicEntryBase & {
  schoolName: string;
  department?: string;
  startDate: string;
  endDate: string;
};

export type WorkHistory = DynamicEntryBase & {
  companyName: string;
  department: string;
  position: string;
  startDate: string;
  endDate: string;
};

export type Qualification = DynamicEntryBase & {
  qualificationName: string;
  acquisitionDate: string;
};

export interface ExternalService {
  id: string;
  name: string;
  description: string;
  connected: boolean;
}

export interface AppState {
  profile: Profile;
  services: ExternalService[];
}