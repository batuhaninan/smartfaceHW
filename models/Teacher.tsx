export class Teacher {
    
    name: string
    age: number
    courses: string[]

    constructor (name: string, age: number, courses: string[]) {
        this.name = name;
        this.age = age;
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
            age: teacher.age,
            courses: teacher.courses
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Teacher(data.name, data.age, data.courses);
    }
};