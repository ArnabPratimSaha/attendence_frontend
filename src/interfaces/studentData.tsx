import { ClassInterface, Student } from "./classData";

export interface StudentCombineDataInterface extends Student  {
    teachers:Array<string>,
    attendenceDate:Array<Date>
}