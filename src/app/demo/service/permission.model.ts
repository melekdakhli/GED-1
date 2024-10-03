// permission.model.ts




export interface Permission {
    id: number;
    name: string;
    create: string;
    show: string;
    delete: string;
    modifier: string;
    telech: string;

  }

  // Ajoutez cette nouvelle interface si elle n'existe pas déjà
  export interface RolePermissions {
    id: number;
    roleName: string;
    permissions: Permission;
  }
