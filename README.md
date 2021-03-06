# MEP Digital
Website to manage elementary school courses built with Node.js backend and React frontend. With email features to get list of students as pdf and receive registration password.  

## Roles 
### Admin
* create/read/update/delete courses/teachers/students
* assign teachers/students to courses

### Teacher
* create/read/update/delete course news/assignments
* create/read course chat messages
* request an email with the list of course students as pdf

### Student
* read course news/assignments
* create/read course chat messages
* review course teacher

## MongoDB Collections Schemas 
### Admin  
{  
&ensp;email: string,  
&ensp;password: string  
}  

### Student 
{  
&ensp;id: string,  
&ensp;email: string,  
&ensp;password: string,  
&ensp;name: string,  
&ensp;lastname: string,  
&ensp;grade: number  
}

### Teacher 
{  
&ensp;id: string,  
&ensp;email: string,  
&ensp;password: string,  
&ensp;name: string,  
&ensp;lastname: string,  
&ensp;**ratings**: [  
&emsp;{  
&emsp;&ensp;student: ObjectId   
&emsp;&ensp;rating: number  
&emsp;}  
&ensp;]  
}  

### Course 
{  
&ensp;id: string,  
&ensp;name: string,  
&ensp;grade: number,  
&ensp;teacher: ObjectId,  
&ensp;students: [ObjectId],  
&ensp;**news**: [  
&emsp;{  
&emsp;&ensp;title: string,  
&emsp;&ensp;message: string,  
&emsp;&ensp;date: string,  
&emsp;}  
&ensp;],  
&ensp;**schedule**: [  
&emsp;{  
&emsp;&ensp;day: number,  
&emsp;&ensp;startHour: number,  
&emsp;&ensp;startMinutes: number,  
&emsp;&ensp;endHour: number,  
&emsp;&ensp;endMinutes: number,  
&emsp;}  
&ensp;],  
&ensp;**assignments**: [  
&emsp;{  
&emsp;&ensp;title: string,  
&emsp;&ensp;description: string,  
&emsp;&ensp;submitDate: string,  
&emsp;}  
&ensp;],  
&ensp;**chat**: [  
&emsp;{  
&emsp;&ensp;user: ObjectId,  
&emsp;&ensp;message: string,  
&emsp;&ensp;userType: string,  
&emsp;}  
&ensp;]  
}  
