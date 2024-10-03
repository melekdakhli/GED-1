export interface UserPermission {
    userName: string;
    permissions: {
      forbidden: boolean;
      view: boolean;
      read: boolean;
      write: boolean;
      admin: boolean;
    };
  }
