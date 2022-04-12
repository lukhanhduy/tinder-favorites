import { HttpStatus } from "@nestjs/common";

export interface ResponseSuccessOption {
    total?: number,
    message?: string
    skip?: number,
    limit?: number,
    statusCode: HttpStatus,
}

export interface ResponseFailedOption {
    message?: string,
    statusCode?: HttpStatus,
    error_code?: string,
}