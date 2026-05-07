import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { authService } from '../services/authService';

const authScheme = yup.object({
  email: yup.string().required('Введите email').email('Неверный формат email'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну прописную букву')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Пароль должен содержать хотя бы один специальный символ',
    ),
});

const AuthForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(authScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const auth = async userData => {
    try {
      const { data } = await authService.login(userData);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      reset();
      toast.success(`Авторизация прошла успешно`);
      goToTodoListPage();
    } catch ({ response }) {
      const errorMessage = response?.data?.message;
      toast.error(errorMessage);
    }
  };

  const navigate = useNavigate();

  const goToRegistrationPage = () => {
    navigate('/registration');
  };

  const goToTodoListPage = () => {
    navigate('/todos');
  };

  return (
    <Card
      title={
        <p style={{ textAlign: 'center', fontSize: '30px' }}>Авторизация</p>
      }
    >
      <Form
        name="registrationForm"
        size="large"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        autoComplete="off"
        onFinish={handleSubmit(auth)}
      >
        <Form.Item
          label="Email:"
          name="email"
          style={{ marginBottom: '10px' }}
          help={errors.email?.message}
          validateStatus={errors.email ? 'error' : ''}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите email..." />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          style={{ marginBottom: '10px' }}
          help={errors.password?.message}
          validateStatus={errors.password ? 'error' : ''}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Введите пароль..." />
            )}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '0' }}>
          <Button type="primary" block disabled={!isValid} htmlType="submit">
            Войти
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Typography.Link
            onClick={goToRegistrationPage}
            style={{ textAlign: 'right' }}
          >
            Нет аккаунта? зарегистрируйтесь.
          </Typography.Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AuthForm;
