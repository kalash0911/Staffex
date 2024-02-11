import * as yup from 'yup';
import { INVALID_FIELD, REQUIRED_FIELD } from '../../../constants/err-msgs';
import {
    MONGODB_REGEX,
    MY_SQL_REGEX,
    ORACLE_REGEX,
    PORT_NUMBER_REGEX,
    POSTGRE_SQL,
    REDIS_REGEX,
    SQL_SERVER_REGEX,
} from '../../../constants/regex';
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
                .when('url', {
                    is: (value: string) => value?.length,
                    then: (schema) =>
                        schema
                            .when('databaseType.value', {
                                is: 'Oracle',
                                then: (schema) => schema.nullable().matches(ORACLE_REGEX, INVALID_FIELD),
                            })
                            .when('databaseType.value', {
                                is: 'MySql',
                                then: (schema) => schema.nullable().matches(MY_SQL_REGEX, INVALID_FIELD),
                            })
                            .when('databaseType.value', {
                                is: 'SqlServer',
                                then: (schema) => schema.nullable().matches(SQL_SERVER_REGEX, INVALID_FIELD),
                            })
                            .when('databaseType.value', {
                                is: 'PostgreSQL',
                                then: (schema) => schema.nullable().matches(POSTGRE_SQL, INVALID_FIELD),
                            })
                            .when('databaseType.value', {
                                is: 'MongoDB',
                                then: (schema) => schema.nullable().matches(MONGODB_REGEX, INVALID_FIELD),
                            })
                            .when('databaseType.value', {
                                is: 'Redis',
                                then: (schema) => schema.nullable().matches(REDIS_REGEX, INVALID_FIELD),
                            }),
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
                })
                .when('databaseType.value', {
                    is: 'Redis',
                    then: (schema) => schema.notRequired(),
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
        [['url', 'url']],
    )
    .required();

// @ts-ignore
export const schema: yup.ObjectSchema<TDataBaseFormValues> = yup.object().shape({
    databaseList: yup.array().of(shape),
});
