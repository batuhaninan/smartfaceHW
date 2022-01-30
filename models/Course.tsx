export class Course {
    
    name: string
    homeworks: string[]
    semester: number
    studentCount: number
    teacher: string

    constructor (name: string, homeworks: string[], semester: number, studentCount: number, teacher: string) {
        this.name = name;
        this.homeworks = homeworks;
        this.semester = semester;
        this.studentCount = studentCount;
        this.teacher = teacher;
    }

    toString() {
        return `
        {
            name: ${this.name},
            semester: ${this.semester},
            studentCount: ${this.studentCount},
            teacher: ${this.teacher},
            homeworks: ${this.homeworks}
        }
        `;
    }
}

export const CourseConverter = {
    toFirestore: (course: Course) => {
        return {
            name: course.name,
            homeworks: course.homeworks,
            semester: course.semester,
            studentCount: course.studentCount,
            teacher: course.teacher
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Course(data.name, data.homeworks, data.semester, data.studentCount, data.teacher);
    }
};