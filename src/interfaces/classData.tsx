export interface Student{
    id:string;
    classId:string;
    name: string;
    attendanceArray:Array<boolean>;
    attendanceCount:number;
    roll:string
}
export interface ClassInterface{
    id:string;
    name: string;
    teachers:Array<string>;
    students:Array<Student>;
    attendanceArray:Array<Date>;
    attendanceCount:Array<number>;
}