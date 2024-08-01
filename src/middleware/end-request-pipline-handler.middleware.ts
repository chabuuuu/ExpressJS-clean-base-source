import { NextFunction, Request, Response } from "express";

export function endRequestPipelineHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.end();
}
