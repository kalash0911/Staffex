import * as yup from 'yup';
import { INVALID_FIELD, REQUIRED_FIELD } from '../../../constants/err-msgs';
import { PORT_NUMBER_REGEX, SQL_SERVER_REGEX } from '../../../constants/regex';
import { TDataBase, TDataBaseFormValues, TDataBaseSelectType } from '../../../models/form';

const shape: yup.ObjectSchema<TDataBase> = yup
    .object()
    .shape(
        {
            connection_status: yup.string(),
            databaseType: yup.object({
                value: yup.string(),
                label: yup.string(),
            }) as yup.Schema<TDataBaseSelectType>,
            url: yup
                .string()
                .trim()
                .when('databaseType.value', {
                    is: 'SQLServer',
                    then: (schema) => schema.matches(SQL_SERVER_REGEX, INVALID_FIELD),
                })
                // TODO: change regex
                .when('databaseType.value', {
                    is: 'PostgreSQL',
                    then: (schema) => schema.matches(SQL_SERVER_REGEX, INVALID_FIELD),
                })
                // TODO: change regex
                .when('databaseType.value', {
                    is: 'MySQL',
                    then: (schema) => schema.matches(SQL_SERVER_REGEX, INVALID_FIELD),
                }),
            host: yup
                .string()
                .trim()
                .when('url', {
                    is: (value: string) => !value.length,
                    then: (schema) => schema.required(REQUIRED_FIELD),
                }),
            port: yup.string().optional().trim().matches(PORT_NUMBER_REGEX, { message: INVALID_FIELD }),
            database: yup
                .string()
                .trim()
                .when('url', {
                    is: (value: string) => !value.length,
                    then: (schema) => schema.required(REQUIRED_FIELD),
                }),
            user: yup
                .string()
                .trim()
                .when('url', {
                    is: (value: string) => !value.length,
                    then: (schema) => schema.required(REQUIRED_FIELD),
                }),
            password: yup
                .string()
                .trim()
                .when('url', {
                    is: (value: string) => !value.length,
                    then: (schema) => schema.required(REQUIRED_FIELD),
                }),
        },
        // [['url', 'url']],
    )
    .required();

// @ts-ignore
export const schema: yup.ObjectSchema<TDataBaseFormValues> = yup.object().shape({
    databaseList: yup.array().of(shape),
});
