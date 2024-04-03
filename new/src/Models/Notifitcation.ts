
export type Notification ={
    whenCreated: Date,
    requestTypeId: number,
    requestStudentId: number,
    userId?: number,
    haveSeen?: boolean,
    timePosted?: Date,
}