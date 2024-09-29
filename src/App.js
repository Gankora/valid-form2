//import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './app.module.css';
import { formProps } from './Components/Props';
import { useState } from 'react';

const validationSchema = yup.object().shape({
	email: formProps.fields.email,
	password: formProps.fields.password,
	repeatPassword: formProps.fields.repeatPassword,
});

export const App = () => {
	const [messagePassword, setMessagePassword] = useState('');

	const handleMessagePasswordFocus = () => {
		setMessagePassword(
			'Пароль должен содержать минимум 5 символов, включая хотя бы одну заглавную букву и одну цифру, без пробелов',
		);
	};

	const handleMessagePasswordBlur = () => {
		setMessagePassword('');
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	//const submitButtonRef = useRef(null);

	const sendFormData = (formData) => {
		console.log(formData);
		alert('Пользователь успешно зарегистрирован');
		reset();
	};

	return (
		<div className={styles.app}>
			{messagePassword && (
				<div className={styles.messagePassword}>{messagePassword}</div>
			)}
			<h2>Регистрация пользователя</h2>
			<form className={styles.validForm} onSubmit={handleSubmit(sendFormData)}>
				<input
					className={styles.validInput}
					name="email"
					type="text"
					placeholder="email"
					{...register('email', formProps)}
				/>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<br />
				<input
					className={styles.validInput}
					name="password"
					type="password"
					placeholder="Пароль"
					onBlur={handleMessagePasswordBlur}
					onFocus={handleMessagePasswordFocus}
					{...register('password', {
						...formProps.fields.password,
						onBlur: handleMessagePasswordBlur,
					})}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}

				<br />
				<input
					className={styles.validInput}
					name="repeatPassword"
					type="password"
					placeholder="Повтор пароля"
					{...register('repeatPassword', formProps)}
				/>
				{repeatPasswordError && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<br />
				<button
					className={styles.validButton}
					type="submit"
					disabled={emailError || passwordError || repeatPasswordError}
					//ref={submitButtonRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
