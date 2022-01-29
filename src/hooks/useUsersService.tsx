import { useCallback, useState } from 'react';
import { listUsersService, ListUsersServiceResponse } from '../services';

export interface IUseUsersService {
  users: ListUsersServiceResponse | undefined;
  listUsers: () => Promise<void>;
}

export function useUsersService(): IUseUsersService {
  const [users, setUser] = useState<ListUsersServiceResponse>();

  const listUsers = useCallback(async () => {
    const { data } = await listUsersService();
    setUser(data);
  }, []);

  return { users, listUsers };
}
