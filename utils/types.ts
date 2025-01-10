// User roles in the education system
export type UserRole = 'student' | 'teacher' | 'admin';

// Basic user information
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Course information
export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  studentIds: string[];
}

// Assignment information
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
}

// Grade information
export interface Grade {
  id: string;
  assignmentId: string;
  studentId: string;
  grade: number;
}

// Enrollment information
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
}
