import { Injectable, Inject } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { User, UserDocument } from 'src/shared/schemas'

@Injectable()
export class RequestContext {
    constructor(@Inject(REQUEST) private readonly request: Request) { }

    set user(value: UserDocument) {
        this.request.user = value
    }

    get user() {
        return this.request?.user as UserDocument
    }

    get userAgent() {
        return this.request?.headers?.['user-agent']
    }

    get remoteIP() {
        return this.request?.headers?.['x-forwarded-for'] || this.request.ip
    }

    get id() {
        return this.user?.id
    }


    get token() {
        return this.request?.headers?.authorization
    }

    get email() {
        return this.user?.email
    }

    get name() {
        return this.user?.name
    }

    get author() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
        }
    }

    get protocal() {
        return this.request?.headers?.['x-forwarded-proto'] || this.request.secure ? 'https' : 'http'
    }

    get host() {
        return `${this.protocal}://${this.request?.headers?.['x-forwarded-host'] || this.request.headers.host}`
    }

    get hostname() {
        return this.request.headers?.['x-forwared-host'] || this.request.headers.host
    }
}
