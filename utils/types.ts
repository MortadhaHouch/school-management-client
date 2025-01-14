// User roles in the education system
export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

// Basic user information
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar:string
}

// Course information
export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  studentIds: string[];
  views:number;
  instructor:User;
  resources?:string[]
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

export interface AccessType {
  email:string;
  firstName:string;
  lastName:string;
  avatar: string;
  id:string;
  isLoggedIn:boolean;
  isVerified:boolean;
}
export interface TimeSchedule {
  _id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  createdBy: string; // User ID
}
