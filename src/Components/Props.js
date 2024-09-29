import * as yup from 'yup';
import { cyrillicRegex, emailRegex, passwordRegex } from './Regex';

export const formProps = yup.object().shape({
	email: yup
		.string()
		.required('Необходимо заполнить email-адрес')
		.test('isEmailValid', 'Неверный формат e-mail', (value) => {
			return emailRegex.test(value);
		})
		.test(
			'cyrillicValid',
			'В наименовании почты не должно быть кириллицы',
			(value) => {
				return !cyrillicRegex.test(value);
			},
		),
	password: yup
		.string()
		.required('Необходимо заполнить пароль')
		.test(
			'cyrillicValid',
			'В названии пароля нельзя использовать кириллицу',
			(value) => {
				return !cyrillicRegex.test(value);
			},
		)
		.test('isPasswordlValid', 'Ошибка наименования пароля', (value) => {
			return passwordRegex.test(value);
		}),
	repeatPassword: yup
		.string()
		.required('Необходимо повторно ввести пароль')
		.oneOf([yup.ref('password'), null], 'Ошибка совместимости значений пароля'),
});
