export class Homework {
    
    title: string
    course: string
    isUploaded: boolean
    status: string
    currentAttempts: number
    totalAttempts: number
    uploadedFiles: string[]

    constructor (title: string, course: string, isUploaded: boolean, status: string, currentAttempts: number, totalAttempts: number, uploadedFiles: string[]) {
        this.title = title;
        this.course = course;
        this.isUploaded = isUploaded;
        this.status = status;
        this.currentAttempts = currentAttempts;
        this.totalAttempts = totalAttempts;
        this.uploadedFiles = uploadedFiles;
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
            currentAttempts: homework.currentAttempts,
            totalAttempts: homework.totalAttempts,
            uploadedFiles: homework.uploadedFiles,
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Homework(data.title, data.course, data.isUploaded, data.status, data.currentAttempts, data.totalAttempts, data.uploadedFiles);
    }
};