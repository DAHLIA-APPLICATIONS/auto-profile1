'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Profile, ExternalService } from '@/types';

interface AppContextType {
  state: AppState;
  updateProfile: (profile: Partial<Profile>) => void;
  toggleService: (serviceId: string) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialProfile: Profile = {
  name: '',
  nameKana: '',
  birthDate: '',
  address: '',
  gender: '',
  phone: '',
  email: '',
  maritalStatus: '',
  dependents: '',
  educations: [],
  workHistories: [],
  qualifications: [],
};

const initialServices: ExternalService[] = [
  {
    id: 'service-a',
    name: 'サービス A',
    description: '効率的なデータ管理ソリューション',
    connected: false,
  },
  {
    id: 'service-b',
    name: 'サービス B',
    description: 'クラウドストレージとバックアップ',
    connected: false,
  },
  {
    id: 'service-c',
    name: 'サービス C',
    description: '分析レポートとインサイト',
    connected: false,
  },
];

const initialState: AppState = {
  profile: initialProfile,
  services: initialServices,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const updateProfile = (profileUpdate: Partial<Profile>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate },
    }));
  };

  const toggleService = (serviceId: string) => {
    setState(prev => ({
      ...prev,
      services: prev.services.map(service =>
        service.id === serviceId
          ? { ...service, connected: !service.connected }
          : service
      ),
    }));
  };

  const resetAll = () => {
    setState({
      profile: initialProfile,
      services: initialServices,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateProfile,
        toggleService,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}