import { Controller, HttpStatus, Req } from "@nestjs/common";
import { Response } from "express";
import { ResponseFailedOption, ResponseSuccessOption } from "../interfaces/response.interface";
import * as hump from 'humps';
@Controller()
export class BaseController {
    constructor() { }


    responseSuccess(
        res: Response,
        data: any,
        optional: ResponseSuccessOption,
        isNormalLize = true
    ) {
        const skip = optional.skip;
        const limit = optional.limit;
        const { message, total, statusCode = HttpStatus.OK, } = optional;

        const payload = isNormalLize ? this.normalizeMongooseObject(data) : data;
        this.removeclassifiedKey(payload, ['password']),
            res.status(statusCode).send({
                status_code: statusCode,
                message,
                data: isNormalLize ? hump.depascalizeKeys(payload) : payload,
                total,
                skip,
                limit,
            });
    }

    async responseFailed(
        res,
        optional: ResponseFailedOption
    ) {
        const { error_code: error, statusCode, message, } = optional;
        // let resMessage = message != null ? [message] : [];
        res.status(statusCode).send(
            {
                status_code: statusCode,
                error,
                message: message,
            },
        );
    }


    removeclassifiedKey(object: any, classifiedKey: string[]) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];
                if (classifiedKey.includes(key)) {
                    delete object[key];
                } else if (value && value instanceof Object) {
                    this.removeclassifiedKey(value, classifiedKey);
                } else if (value && value instanceof Array) {
                    for (let index = 0; index < value.length; index++) {
                        const element = value[index];
                        this.removeclassifiedKey(element, classifiedKey);
                    }
                }
            }
        }
    }
    normalizeMongooseObject(_object) {
        if (!_object) return _object;

        let object;
        if (typeof _object.toJSON === 'function') {
            object = _object.toJSON();
        } else {
            object = _object;
        }

        if (object instanceof Array) {
            for (let index = 0; index < object.length; index++) {
                const element = object[index];
                object[index] = this.normalizeMongooseObject(element);
            }
        } else {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    const value = object[key];

                    if (key === '_id') {
                        object.id = object._id;
                        delete object._id;
                        if (typeof object.id === 'object') {
                            object.id = object.id.toString();
                        }

                    } else if (key === '__v') {
                        delete object.__v;

                    } else if (value && value instanceof Object && !(value instanceof Array)) {

                        object[key] = this.normalizeMongooseObject(value);

                    } else if (value && value instanceof Array) {
                        for (let index = 0; index < value.length; index++) {
                            const element = value[index];
                            value[index] = this.normalizeMongooseObject(element);
                        }
                    }
                }
            }
        }
        return object;
    }


}