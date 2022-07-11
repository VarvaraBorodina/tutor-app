import { Routes, Route } from "react-router-dom";

import { ROUTE_NAMES } from "./routeNames";
import StartContainer from "../pages/Start/containers/StartContainer";
import BeforeRegisterView from "../pages/BeforeRegister/components/BeforeRegisterView";
import TeacherRegisterContainer from "../pages/TeacherRegister/containers/TeacherRegisterContainer";
import StudentRegisterContainer from "../pages/StudentRegister/containers/StudentRegisterContainer";
import StudentContainer from "../pages/Student/containers/StudentContainer";
import TeacherContainer from "../pages/Teacher/containers/TeacherContainer";
import SearchContainer from "../pages/Search/containers/SearchContainer";
import NotFound from "../pages/NotFound";

export const Router = () => {
    return (
        <Routes>
            <Route path={ROUTE_NAMES.START_PAGE} element={<StartContainer />} />
            <Route path={ROUTE_NAMES.BEFORE_REGISTER_PAGE} element={<BeforeRegisterView />} />

            <Route path={ROUTE_NAMES.STUDENT_REGISTER} element={<StudentRegisterContainer/>} />
            <Route path={ROUTE_NAMES.TEACHER_REGISTER} element={<TeacherRegisterContainer />} />

            <Route path={ROUTE_NAMES.STUDENT_ACCOUNT} element={<StudentContainer/>} />
            <Route path={`${ROUTE_NAMES.TEACHER_ACCOUNT}/:teacher_id`} element={<TeacherContainer/>} />

            <Route path={ROUTE_NAMES.SEARCH} element={<SearchContainer/>} />

            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
};
