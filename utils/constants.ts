import { Assignment, Course, Enrollment, Grade, User } from "./types";

const images = [
  {
    path: "/assets/images/img-1.webp",
    caption: "Empowering Modern Education",
    paragraph: "Our platform revolutionizes the educational experience by providing an all-in-one solution for students, teachers, and administrators. It streamlines course management, simplifies communication, and enhances collaboration, creating a seamless learning environment for everyone involved."
  },
  {
    path: "/assets/images/img-2.webp",
    caption: "Interactive Learning Made Easy",
    paragraph: "Students can easily access course materials, complete assignments, and monitor their progress through intuitive dashboards. Engaging content and interactive tools make learning more dynamic and effective, keeping students motivated and on track."
  },
  {
    path: "/assets/images/img-3.jpg",
    caption: "Simplified Teaching Tools",
    paragraph: "Teachers can effortlessly design courses, assign projects, and track student performance. With automated grading and organized class management, educators can focus more on teaching and inspiring students rather than managing paperwork."
  },
  {
    path: "/assets/images/img-4.webp",
    caption: "Efficient Academic Oversight",
    paragraph: "Administrators can seamlessly manage users, courses, and enrollments through powerful tools that simplify academic operations. Real-time data insights and automated workflows help maintain a smooth and well-structured educational system."
  },
  {
    path: "/assets/images/img-5.jpg",
    caption: "Real-Time Performance Tracking",
    paragraph: "Students and teachers can access real-time updates on grades, assignments, and deadlines. Instant feedback encourages continuous improvement, fostering a more proactive and responsive learning environment."
  },
  {
    path: "/assets/images/img-6.jpg",
    caption: "Collaborative Learning Environment",
    paragraph: "Our platform bridges the gap between educators and learners by enabling effective communication, discussion forums, and group projects. This collaborative space encourages peer learning and a stronger academic community."
  },
  {
    path: "/assets/images/img-7.jpg",
    caption: "Future-Ready Education",
    paragraph: "Designed to adapt and grow with modern educational needs, our platform integrates the latest technology to support personalized learning paths, digital classrooms, and scalable solutions—preparing institutions and learners for a brighter future."
  }
];

// Expanded Example Data with Relationships
const users: User[] = [
  { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'student' },
  { id: 'u2', name: 'Bob', email: 'bob@example.com', role: 'teacher' },
  { id: 'u3', name: 'Charlie', email: 'charlie@example.com', role: 'admin' },
  { id: 'u4', name: 'Diana', email: 'diana@example.com', role: 'student' },
  { id: 'u5', name: 'Eve', email: 'eve@example.com', role: 'teacher' },
  { id: 'u6', name: 'Frank', email: 'frank@example.com', role: 'student' },
  { id: 'u7', name: 'Grace', email: 'grace@example.com', role: 'teacher' },
  { id: 'u8', name: 'Hannah', email: 'hannah@example.com', role: 'student' },
  { id: 'u9', name: 'Ian', email: 'ian@example.com', role: 'student' },
  { id: 'u10', name: 'Jack', email: 'jack@example.com', role: 'student' },
  { id: 'u11', name: 'Kate', email: 'kate@example.com', role: 'student' },
  { id: 'u12', name: 'Leo', email: 'leo@example.com', role: 'teacher' },
  { id: 'u13', name: 'Megan', email: 'megan@example.com', role: 'student' },
  { id: 'u14', name: 'Nathan', email: 'nathan@example.com', role: 'admin' },
];

const courses: Course[] = [
  {
    id: 'c1',
    title: 'Mathematics 101',
    description: 'An introductory course on algebra and geometry.',
    teacherId: 'u2',
    studentIds: ['u1', 'u4', 'u6', 'u9', 'u11'],
  },
  {
    id: 'c2',
    title: 'Physics Basics',
    description: 'Fundamental concepts in physics.',
    teacherId: 'u5',
    studentIds: ['u1', 'u4', 'u8', 'u13'],
  },
  {
    id: 'c3',
    title: 'Chemistry for Beginners',
    description: 'Basic principles of chemistry.',
    teacherId: 'u7',
    studentIds: ['u6', 'u8', 'u10', 'u11', 'u13'],
  },
  {
    id: 'c4',
    title: 'History 101',
    description: 'An overview of ancient civilizations.',
    teacherId: 'u12',
    studentIds: ['u4', 'u6', 'u9', 'u11'],
  },
  {
    id: 'c5',
    title: 'Advanced Programming',
    description: 'Learn the art of writing efficient code.',
    teacherId: 'u5',
    studentIds: ['u1', 'u4', 'u6', 'u9'],
  },
];

const assignments: Assignment[] = [
  { id: 'a1', courseId: 'c1', title: 'Algebra Homework', description: 'Complete the algebra worksheet.', dueDate: new Date('2025-01-15') },
  { id: 'a2', courseId: 'c2', title: 'Physics Lab Report', description: 'Write a report on the pendulum experiment.', dueDate: new Date('2025-01-20') },
  { id: 'a3', courseId: 'c3', title: 'Periodic Table Quiz', description: 'Answer the quiz on the periodic table.', dueDate: new Date('2025-01-18') },
  { id: 'a4', courseId: 'c4', title: 'Ancient Egypt Essay', description: 'Write an essay about ancient Egyptian civilization.', dueDate: new Date('2025-01-22') },
  { id: 'a5', courseId: 'c5', title: 'JavaScript Project', description: 'Build a simple web application.', dueDate: new Date('2025-01-25') },
  { id: 'a6', courseId: 'c1', title: 'Geometry Test', description: 'Solve the geometry problems provided.', dueDate: new Date('2025-01-28') },
];

const grades: Grade[] = [
  { id: 'g1', assignmentId: 'a1', studentId: 'u1', grade: 85 },
  { id: 'g2', assignmentId: 'a2', studentId: 'u4', grade: 90 },
  { id: 'g3', assignmentId: 'a3', studentId: 'u6', grade: 88 },
  { id: 'g4', assignmentId: 'a4', studentId: 'u8', grade: 92 },
  { id: 'g5', assignmentId: 'a5', studentId: 'u9', grade: 95 },
  { id: 'g6', assignmentId: 'a6', studentId: 'u1', grade: 70 },
  { id: 'g7', assignmentId: 'a1', studentId: 'u11', grade: 77 },
  { id: 'g8', assignmentId: 'a2', studentId: 'u13', grade: 88 },
  { id: 'g9', assignmentId: 'a3', studentId: 'u10', grade: 90 },
];

const enrollments: Enrollment[] = [
  { id: 'e1', studentId: 'u1', courseId: 'c1', enrollmentDate: new Date('2025-01-01') },
  { id: 'e2', studentId: 'u4', courseId: 'c2', enrollmentDate: new Date('2025-01-02') },
  { id: 'e3', studentId: 'u6', courseId: 'c3', enrollmentDate: new Date('2025-01-03') },
  { id: 'e4', studentId: 'u9', courseId: 'c4', enrollmentDate: new Date('2025-01-04') },
  { id: 'e5', studentId: 'u13', courseId: 'c2', enrollmentDate: new Date('2025-01-05') },
  { id: 'e6', studentId: 'u10', courseId: 'c3', enrollmentDate: new Date('2025-01-06') },
  { id: 'e7', studentId: 'u11', courseId: 'c1', enrollmentDate: new Date('2025-01-07') },
  { id: 'e8', studentId: 'u8', courseId: 'c2', enrollmentDate: new Date('2025-01-08') },
];

export { images }
