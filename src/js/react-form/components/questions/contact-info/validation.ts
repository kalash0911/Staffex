import * as yup from 'yup';
import { EMAIL_INVALID, PHONE_INVALID, REQUIRED_FIELD } from '../../../constants/err-msgs';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../constants/regex';

export const schema = yup
    .object({
        firstName: yup.string().required(REQUIRED_FIELD),
        lastName: yup.string().required(REQUIRED_FIELD),
        phone: yup.string().required(REQUIRED_FIELD).matches(PHONE_REGEX, { message: PHONE_INVALID }),
        altPhone: yup.string(),
        email: yup.string().required(REQUIRED_FIELD).matches(EMAIL_REGEX, { message: EMAIL_INVALID }),
    })
    .required();
