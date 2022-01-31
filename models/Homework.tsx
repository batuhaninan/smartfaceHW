export class Homework {
    
    title: string
    course: string
    isUploaded: boolean
    status: string
    totalAttempts: number

    constructor (title: string, course: string, isUploaded: boolean, status: string, totalAttempts: number) {
        this.title = title;
        this.course = course;
        this.isUploaded = isUploaded;
        this.status = status;
        this.totalAttempts = totalAttempts;
    }

    toString() {
        return "Homework " + this.title + " of course " + this.course;
    }
}

export const HomeworkConverter = {
    toFirestore: (homework: Homework) => {
        return {
            title: homework.title,
            course: homework.course,
            isUploaded: homework.isUploaded,
            status: homework.status,
            totalAttempts: homework.totalAttempts,
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Homework(data.title, data.course, data.isUploaded, data.status, data.totalAttempts);
    }
};