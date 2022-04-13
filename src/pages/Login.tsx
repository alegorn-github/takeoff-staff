import { Button, Col, Form, Input, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../common/Header';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'antd/lib/form/Form';
import { selectUser, setUser, TUser } from '../store/user';
import { useDispatch, useSelector } from 'react-redux';

type TAuthData = {
    email: string;
    password: string;
}

export const Login = ({isLogin}:{isLogin?: boolean}) => {
    const [form] = useForm<TAuthData>();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const user = useSelector(selectUser);
    
    const firebaseLogin = (email:string, password:string)=>{
        const auth = getAuth();
        const firebasePromise = isLogin ? signInWithEmailAndPassword(auth, email, password) : createUserWithEmailAndPassword(auth, email, password);

        firebasePromise.then(({user}) => {
            dispatch(setUser({user:user.email, key:user.uid}));
            nav('/contacts');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });        
    }

    const formSubmit = () => {
        form.validateFields()
        .then((values) => {
            console.log(values);
            firebaseLogin(values.email,values.password)
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });        
    
    }

    return (
        <Layout>
            <AppHeader location='login'/>
            <Content style={{maxWidth:1500,margin:'0 auto',padding:8}}>
                <Form title={isLogin ? 'Вход': 'Новый пользователь'} onFinish={formSubmit} form={form} layout="vertical">
                    <Col>
                        <Form.Item label="Email" name="email">
                            <Input name='user' type="email" maxLength={20}/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="Пароль" name="password">
                            <Input name="password" type="password" maxLength={20} />
                        </Form.Item>
                    </Col>
                    <Button type='primary' htmlType='submit'>{isLogin ? 'Войти': 'Зарегистрироваться'}</Button>
                    <Link to={isLogin? '/registration':'/login'}>
                        <Button type='link'>{isLogin ? 'Зарегистрироваться': 'Войти'}</Button>
                    </Link>
                </Form>
            </Content>
        </Layout>
    )
}