import {SnapshotOptions} from "firebase/firestore";
import {QueryDocumentSnapshot} from "firebase/firestore";

export class Teacher {
    
    name: string
    courses: string[]

    constructor (name: string, courses: string[]) {
        this.name = name;
        this.courses = courses;
    }

    toString() {
        return "Teacher " + this.name + " gives " + this.courses.length + " courses!";
    }
}

export const TeacherConverter = {
    toFirestore: (teacher: Teacher) => {
        return {
            name: teacher.name,
            courses: teacher.courses
            };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new Teacher(data.name, data.courses);
    }
};