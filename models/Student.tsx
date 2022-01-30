export class Student {
    
    name: string
    courses: string[]

    constructor (name: string, courses: string[]) {
        this.name = name;
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
            courses: student.courses
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Student(data.name, data.courses);
    }
};