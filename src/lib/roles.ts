export const userRoles = ['admin', 'staff', 'tenant', 'business', 'enquiry'] as const;

export type UserRole = (typeof userRoles)[number];

export type UserStatus = 'active' | 'pending' | 'archived';

export const defaultUserRole: UserRole = 'enquiry';

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && userRoles.includes(value as UserRole);
}

export function isStaffRole(role?: UserRole | null) {
  return role === 'admin' || role === 'staff';
}

export function canAccessAdmin(role?: UserRole | null) {
  return role === 'admin' || role === 'staff';
}

export function canAccessTenant(role?: UserRole | null) {
  return role === 'tenant' || isStaffRole(role);
}

export function canAccessBusiness(role?: UserRole | null) {
  return role === 'business' || isStaffRole(role);
}

export function roleLabel(role?: UserRole | null) {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'staff':
      return 'Staff';
    case 'tenant':
      return 'Tenant';
    case 'business':
      return 'Business';
    case 'enquiry':
      return 'Enquiry';
    default:
      return 'Account';
  }
}
