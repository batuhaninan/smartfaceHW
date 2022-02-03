import {SnapshotOptions} from "firebase/firestore";
import {QueryDocumentSnapshot} from "firebase/firestore";

export class Student {
    
    name: string
    email: string
    courses: string[]

    constructor (name: string, email: string, courses: string[]) {
        this.name = name;
        this.email = email;
        this.courses = courses;
    }

    toString() {
        return "Student " + this.name + " has " + this.courses.length + " courses!";
    }
}

export const StudentConverter = {
    toFirestore: (student: Student) => {
        return {
            name: student.name,
            email: student.email,
            courses: student.courses
            };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new Student(data.name, data.email, data.courses);
    }
};