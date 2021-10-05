/**
 * Checks if two class periods overlap
 * @param {*} pA First class period
 * @param {*} pB Second class period
 * @returns if the periods overlap
 */
const classPeriodsOverlap = (pA, pB) => {
  if (pA.day != pB.day) return false;

  let startA = new Date();  // using now date with Date and setting hours and minutes to compare
  let endA = new Date();
  let startB = new Date();
  let endB = new Date();
  startA.setHours(pA.startHour, pA.startMinutes, 0, 0);  // set seconds and miliseconds to zero, 
  endA.setHours(pA.endHour, pA.endMinutes, 0, 0);
  startB.setHours(pB.startHour, pB.startMinutes, 0, 0);
  endB.setHours(pB.endHour, pB.endMinutes, 0, 0);
  
  if (startA <= startB && startB <= endA) return true; // startB in A or endA in B
  if (startA <= endB && endB <= endA) return true; // endB in A or startA in B
  if (startB < startA && endA < endB) return true;  // startA and endA in B
  return false;
}


/**
 * Checks if a new class period overlaps with a course schedule
 * @param {*} newClassPeriod new class period
 * @param {*} course course used to check schedule
 * @returns if the new class period overlaps course schedule
 */
const classPeriodOverlapsCourse = (newClassPeriod, course) => {
  for (const courseClassPeriod of course.schedule) {  // compare against all course class periods
    if (classPeriodsOverlap(newClassPeriod, courseClassPeriod)) return true;
  }
  return false;
}


/**
 * Checks a if single schedule overlaps a list of courses
 * @param {*} schedule list of class periods of a given course
 * @param {*} courses list of courses with schedules
 * @returns if the schedule overlaps the schedules of the courses
 */
exports.scheduleOverlapsCourses = (schedule, courses) => {
  for (const classPeriod of schedule) {
    for(const course of courses) {
      if (classPeriodOverlapsCourse(classPeriod, course)) return true;
    }
  }
  return false;
};


exports.classPeriodOverlapsCourse = classPeriodOverlapsCourse;

