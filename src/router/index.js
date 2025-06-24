import AdminLayout from '@/layouts/AdminLayout.vue';
import ClientLayout from '@/layouts/ClientLayout.vue';
import ChangePasswordView from '@/views/Account/ChangePasswordView.vue';
import ForgotPasswordView from '@/views/Account/ForgotPasswordView.vue';
import InformationUserView from '@/views/Account/InformationUserView.vue';
import LoginView from '@/views/Account/LoginView.vue';
import RegisterView from '@/views/Account/RegisterView.vue';
import AdminDashboardView from '@/views/Admin/AdminDashboardView.vue';
import CommissionCreate from '@/views/Admin/CommissionManagement/CommissionCreate.vue';
import CommissionList from '@/views/Admin/CommissionManagement/CommissionList.vue';
import CommissionUpdate from '@/views/Admin/CommissionManagement/CommissionUpdate.vue';
import CourseCreate from '@/views/Admin/CourseManagement/CourseCreate.vue';
import CourseList from '@/views/Admin/CourseManagement/CourseList.vue';
import CourseUpdate from '@/views/Admin/CourseManagement/CourseUpdate.vue';
import CourseTypeCreate from '@/views/Admin/CourseTypeManagement/CourseTypeCreate.vue';
import CourseTypeList from '@/views/Admin/CourseTypeManagement/CourseTypeList.vue';
import CourseTypeUpdate from '@/views/Admin/CourseTypeManagement/CourseTypeUpdate.vue';
import LessonCreate from '@/views/Admin/LessonManagement/LessonCreate.vue';
import LessonList from '@/views/Admin/LessonManagement/LessonList.vue';
import LessonUpdate from '@/views/Admin/LessonManagement/LessonUpdate.vue';
import PaymentList from '@/views/Admin/Payment/PaymentList.vue';
import StatisticalView from '@/views/Admin/Statistical/StatisticalView.vue';
import StudentCreate from '@/views/Admin/StudentManagement/StudentCreate.vue';
import StudentList from '@/views/Admin/StudentManagement/StudentList.vue';
import TeacherCreate from '@/views/Admin/TeacherManagement/TeacherCreate.vue';
import TeacherDetail from '@/views/Admin/TeacherManagement/TeacherDetail.vue';
import TeacherList from '@/views/Admin/TeacherManagement/TeacherList.vue';
import ClientAboutView from '@/views/Client/ClientAboutView.vue';
import ClientBlogView from '@/views/Client/ClientBlogView.vue';
import ClientContactView from '@/views/Client/ClientContactView.vue';
import ClientCourseDetailView from '@/views/Client/ClientCourseDetailView.vue';
import ClientCourseView from '@/views/Client/ClientCourseView.vue';
import ClientHomeView from '@/views/Client/ClientHomeView.vue';
import ClientInstructorView from '@/views/Client/ClientInstructorView.vue';
import ClientLessonView from '@/views/Client/ClientLessonView.vue';
import ClientPaymentView from '@/views/Client/ClientPaymentView.vue';
import ClientReportView from '@/views/Client/ClientReportView.vue';
import { createRouter, createWebHistory } from 'vue-router'
import {jwtDecode} from "jwt-decode";
import { showError } from '@/assets/Admin/js/alert'
import TeacherLayout from '@/layouts/TeacherLayout.vue';
import TeacherDashboardView from '@/views/Teacher/TeacherDashboardView.vue';
import TeacherCourseList from '@/views/Teacher/TeacherCourseManagement/TeacherCourseList.vue';
import TeacherCourseCreate from '@/views/Teacher/TeacherCourseManagement/TeacherCourseCreate.vue';
import TeacherCourseUpdate from '@/views/Teacher/TeacherCourseManagement/TeacherCourseUpdate.vue';
import TeacherLessonList from '@/views/Teacher/TeacherLessonManagement/TeacherLessonList.vue';
import TeacherLessonCreate from '@/views/Teacher/TeacherLessonManagement/TeacherLessonCreate.vue';
import TeacherLessonUpdate from '@/views/Teacher/TeacherLessonManagement/TeacherLessonUpdate.vue';
import TeacherStudentList from '@/views/Teacher/TeacherStudentManagement/TeacherStudentList.vue';
import TeacherStudentCreate from '@/views/Teacher/TeacherStudentManagement/TeacherStudentCreate.vue';
import TeacherPaymentList from '@/views/Teacher/TeacherPayment/TeacherPaymentList.vue';
import TeacherStatisticalView from '@/views/Teacher/TeacherStatistical/TeacherStatisticalView.vue';
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
    //client
    {
      path: '/',
      component: ClientLayout, 
      children: [
        { path: '', name: 'home', component: ClientHomeView},
        { path: 'about', name: 'about', component: ClientAboutView },
        { path: 'course', name: 'course', component: ClientCourseView },
        { path: 'course-detail/:id', name: 'course-detail', component: ClientCourseDetailView },
        { path: 'course-detail', name: 'course-detail-no-id', component: ClientCourseDetailView },
        { path: 'instructor', name: 'instructor', component: ClientInstructorView },
        { path: 'blog', name: 'blog', component: ClientBlogView, props: true },
        { path: 'contact', name: 'contact', component: ClientContactView},
        { path: 'login', name: 'login', component: LoginView },
        { path: 'register', name: 'register', component: RegisterView },
        { path: 'forgot-password', name: 'forgot-password', component: ForgotPasswordView },
        // authentication
        { path: 'lesson/:id', name: 'lesson', component: ClientLessonView },
        { path: 'payment', name: 'payment', component: ClientPaymentView },
        { path: 'report', name: 'report', component: ClientReportView },
        { path: 'information', name: 'information', component: InformationUserView },
        { path: 'change-password', name: 'change-password', component: ChangePasswordView },
        { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView }
      ],
    },

    //admin
    {
      path: '/admin',
      component: AdminLayout, 
      redirect: "/admin/dashboard",
     // meta: { requiresAdmin: true , role: ['Admin']}, // Chỉ admin mới truy cập được
      children: [
        { path: 'dashboard', name: 'dashboard', component: AdminDashboardView },
        {
          path: 'course-type',
          children: [
            { path: 'list', name: 'course-type-list', component: CourseTypeList },
            { path: 'create', name: 'course-type-create', component: CourseTypeCreate },
            { path: 'update/:id', name: 'course-type-update', component: CourseTypeUpdate },
          ],
        },
        {
          path: 'course',
          children: [
            { path: 'list', name: 'course-list', component: CourseList },
            { path: 'create', name: 'course-create', component: CourseCreate },
            { path: 'update/:id', name: 'course-update', component: CourseUpdate },
          ],
        },
        {
          path: 'lesson',
          children: [
            { path: 'list', name: 'lesson-list', component: LessonList },
            { path: 'create', name: 'lesson-create', component: LessonCreate },
            { path: 'update/:id', name: 'lesson-update', component: LessonUpdate },
          ],
        },
        {
          path: 'commission',
          children: [
            { path: 'list', name: 'commission-list', component: CommissionList },
            { path: 'create', name: 'commission-create', component: CommissionCreate },
            { path: 'update/:id', name: 'commission-update', component: CommissionUpdate },
          ],
        },
        {
          path: 'student',
          children: [
            { path: 'list', name: 'student-list', component: StudentList },
            { path: 'create', name: 'student-create', component: StudentCreate },
          ],
        },
        {
          path: 'teacher',
          children: [
            { path: 'list', name: 'teacher-list', component: TeacherList },
            { path: 'create', name: 'teacher-create', component: TeacherCreate },
            { path: 'detail', name: 'teacher-detail', component: TeacherDetail },
          ],
        },
        {
          path: 'payment',
          children: [
            { path: 'list', name: 'payment-list', component: PaymentList },
          ],
        },
        { path: 'statistical', name: 'statistical', component: StatisticalView }

      ],
    },

    //teacher
    {
      path: '/teacher',
      component: TeacherLayout, 
      redirect: "/teacher/dashboard",
      meta: { requiresTeacher: true , role: ['Teacher']}, // Chỉ teacher mới truy cập được
      children: [
        { path: 'dashboard', name: 'teacher-dashboard', component: TeacherDashboardView },
        {
          path: 'course',
          children: [
            { path: 'list', name: 'teacher-course-list', component: TeacherCourseList },
            { path: 'create', name: 'teacher-course-create', component: TeacherCourseCreate },
            { path: 'update/:id', name: 'teacher-course-update', component: TeacherCourseUpdate },
          ],
        },
        {
          path: 'lesson',
          children: [
            { path: 'list', name: 'teacher-lesson-list', component: TeacherLessonList },
            { path: 'create', name: 'teacher-lesson-create', component: TeacherLessonCreate },
            { path: 'update/:id', name: 'teacher-lesson-update', component: TeacherLessonUpdate },
          ],
        },
        {
          path: 'student',
          children: [
            { path: 'list', name: 'teacher-student-list', component: TeacherStudentList },
            { path: 'create', name: 'teacher-student-create', component: TeacherStudentCreate },
          ],
        },
        {
          path: 'payment',
          children: [
            { path: 'list', name: 'teacher-payment-list', component: TeacherPaymentList },
          ],
        },
        { path: 'statistical', name: 'teacher-statistical', component: TeacherStatisticalView }

      ],
    }
  ],
});

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAdmin ) {
    const token = sessionStorage.getItem('TOKEN');
    if (!token) {
      showError("Không có quyền truy cập!");
      return { path: '/login' };
    }

    const decoded = jwtDecode(token);
    const role = decoded.role[0].authority;
    // console.log("role:" + role)
    if (!role || !to.meta.role || !to.meta.role.includes(role)) {
      showError("Bạn không có quyền truy cập!");
      return { path: '/login' };
    }
  }

  if (to.meta.requiresTeacher) {
    const token = sessionStorage.getItem('TOKEN');
    if (!token) {
      showError("Không có quyền truy cập!");
      return { path: '/login' };
    }

    const decoded = jwtDecode(token);
    const role = decoded.role[0].authority;
    console.log("role:" + role)
    if (!role || !to.meta.role || !to.meta.role.includes(role)) {
      showError("Bạn không có quyền truy cập!");
      return { path: '/login' };
    }
  }
});


export default router
