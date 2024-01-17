import * as yup from 'yup';
import { EMAIL_INVALID, PHONE_INVALID, REQUIRED_FIELD } from '../../../constants/err-msgs';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../constants/regex';

export const schema = yup
    .object()
    .shape(
        {
            isB2B: yup.boolean(),
            phone: yup.string().required(REQUIRED_FIELD).matches(PHONE_REGEX, { message: PHONE_INVALID }),
            altPhone: yup.string().when('altPhone', {
                is: (value: string) => value?.length,
                then: (schema) => schema.matches(PHONE_REGEX, { message: PHONE_INVALID }),
            }),
            email: yup.string().required(REQUIRED_FIELD).matches(EMAIL_REGEX, { message: EMAIL_INVALID }),
            companyName: yup.string().when('isB2B', {
                is: true,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
            contactFirstName: yup.string().when('isB2B', {
                is: true,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
            contactLastName: yup.string().when('isB2B', {
                is: true,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
            contactFirstTitle: yup.string().when('isB2B', {
                is: true,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
            firstName: yup.string().when('isB2B', {
                is: false,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
            lastName: yup.string().when('isB2B', {
                is: false,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
        },
        [['altPhone', 'altPhone']],
    )
    .required();
