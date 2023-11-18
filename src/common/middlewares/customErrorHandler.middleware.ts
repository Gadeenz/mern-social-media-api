import { ValidationError } from 'class-validator';
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, _req: any, res: any) {
    const status = error?.status || error?.httpCode || 500;
    const VALIDATION_ERRORS_TAIL = "check 'errors' property for more info.";
    if (error?.message.endsWith(VALIDATION_ERRORS_TAIL))
      return res.status(status).send({
        status,
        errors: this.handleValidationErrors(error.errors),
      });
    return res.status(status).send({
      status,
      message: this.formatErrorMessage(error.name, error.message),
    });
  }

  handleValidationErrors(errors: ValidationError[]) {
    const validationErrors: string[] = [];
    errors.forEach((validationError: ValidationError) => {
      if (validationError.constraints) {
        validationErrors.push(...Object.values(validationError.constraints!));
      } else {
        validationError?.children?.forEach((childErrors: ValidationError) => {
          if (childErrors.constraints)
            validationErrors.push(...Object.values(childErrors.constraints!));
          else {
            childErrors?.children?.forEach((childError) => {
              validationErrors.push(...Object.values(childError.constraints!));
            });
          }
        });
      }
    });
    return validationErrors;
  }

  formatErrorMessage(errorName: string, errorMessage: string) {
    let message = '';
    switch (errorName) {
      case 'HttpException':
        message = errorMessage;
        break;
      case 'SyntaxError':
        message = 'Request body is not valid JSON';
        break;
      default:
        message = 'Something went wrong';
        break;
    }
    return message;
  }
}
