import { defineAbility } from '@casl/ability';

export const createAbility = (userRoles: string[] = []) => {
  return defineAbility((can, cannot) => {
    // Reglas para todos los usuarios logueados
    if (userRoles.length > 0) {
      can('read', 'all');
      can('send', 'message');
    }

    // Reglas específicas para el rol 'admin'
    if (userRoles.includes('admin')) {
      can('manage', 'all'); // Un admin puede hacer cualquier cosa
    }

    // No logueados
    if (userRoles.length <= 0) {
      cannot('read', 'all');
      cannot('send', 'message');
    }
  });
};