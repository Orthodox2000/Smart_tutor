import { UserRole } from './RoleSelector';

// Define permissions for each role
export const rolePermissions = {
  admin: {
    canViewAllEducators: true,
    canEditEducators: true,
    canDeleteEducators: true,
    canManageCourses: true,
    canViewAnalytics: true,
    canShortlist: false,
    canRequestInterview: false,
    canEnroll: false,
    canContactDirectly: true,
  },
  tutor: {
    canViewAllEducators: false,
    canEditEducators: false,
    canDeleteEducators: false,
    canManageCourses: true,
    canViewAnalytics: false,
    canShortlist: false,
    canRequestInterview: false,
    canEnroll: false,
    canContactDirectly: true,
  },
  student: {
    canViewAllEducators: true,
    canEditEducators: false,
    canDeleteEducators: false,
    canManageCourses: false,
    canViewAnalytics: false,
    canShortlist: false,
    canRequestInterview: false,
    canEnroll: true,
    canContactDirectly: true,
  },
  parent: {
    canViewAllEducators: true,
    canEditEducators: false,
    canDeleteEducators: false,
    canManageCourses: false,
    canViewAnalytics: false,
    canShortlist: false,
    canRequestInterview: false,
    canEnroll: false,
    canContactDirectly: true,
  },
  hiring: {
    canViewAllEducators: true,
    canEditEducators: false,
    canDeleteEducators: false,
    canManageCourses: false,
    canViewAnalytics: true,
    canShortlist: true,
    canRequestInterview: true,
    canEnroll: false,
    canContactDirectly: true,
  },
};

export function getRolePermissions(role: UserRole) {
  return rolePermissions[role];
}

export function getEducatorPageTitle(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'All Educators';
    case 'tutor':
      return 'Fellow Tutors';
    case 'student':
      return 'Find Your Perfect Tutor';
    case 'parent':
      return 'Available Tutors';
    case 'hiring':
      return 'Browse Talent Pool';
    default:
      return 'Educators';
  }
}

export function getEducatorPageSubtitle(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'Manage and oversee all teaching staff members';
    case 'tutor':
      return 'Connect with other educators and collaborate';
    case 'student':
      return 'Explore qualified tutors and enroll in their courses';
    case 'parent':
      return 'View tutors teaching your children';
    case 'hiring':
      return 'Discover and recruit top educational talent';
    default:
      return 'View educator profiles';
  }
}
