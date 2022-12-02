import { Request, response, Response } from 'express';
import createCourseService from './createCourseService';

export function createCourse(request: Request, Response: Response) {

  createCourseService.execute({
    name: "NodeJS",
    duration: 10,
    educator: "Dani"
  });

  return response.send();
}